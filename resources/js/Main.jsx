import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useNavigate,
} from "react-router-dom";
import SearchField from "./components/SearchField";
import SpinnerModal from "./components/SpinnerModal";
import RepositoryList from "./components/RepositoryList";
import CommitList from "./components/CommitList";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";

function Main() {
    const [query, setQuery] = useState("");
    const [repositories, setRepositories] = useState([]);
    const [commits, setCommits] = useState([]);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(null);
    const [currentTimeCommit, setCurrentTimeCommit] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 0, totalCount: 0, itemsPerPage: 10 });
    const [commitPagination, setCommitPagination] = useState({ currentPage: 1, totalPages: 0, totalCount: 0, itemsPerPage: 10 });
    const navigate = useNavigate();

    /* This  code is a
    *  responsible for fetching repository data from an API based on a
    *  search query.
    */
    const searchRepositories = async (page = 1) => {

        if (!query) return;
        setLoading(true);
        setHasSearched(false);
        const startTime = Date.now();

        try {
            const response = await axios.get("/api/search", {
                params: { query, page },
            });

            setRepositories(response.data.items);
            setPagination({
                currentPage: response.data.current_page,
                totalPages: response.data.total_pages,
                totalCount: response.data.total_count,
                itemsPerPage: response.data.per_page
            });
            const endTime = Date.now();
            const duration = endTime - startTime;
            setCurrentTime(duration);
            setErrorMessage("");
            setIsModalOpen(false);
            navigate("/");
        } catch (error) {
            const errorData = parseError(error.response.data);
            setErrorMessage(
                <>
                    <strong>{errorData.title}</strong>: {errorData.description}
                </>
            );
            setIsModalOpen(true);
        } finally {
            setHasSearched(true);
            setLoading(false);
        }
    };

    /**
     * The code is designed to handle different types of errors
     * that may occur when interacting with the GitHub API and provide specific error messages based on
     * the error type.
     * @returns The `parseError` function returns an object with a `title` and `description` based on
     * the type of error message passed to it. 
     */
    const parseError = (error) => {
        if (
            error.message?.includes(
                "Only the first 1000 search results are available"
            )
        ) {
            return {
                title: "Search Results Limit Reached",
                description:
                    "GitHub only allows accessing the first 1000 search results. Please refine your search criteria or try a different search.",
            };
        }

        if (error.message?.includes("API rate limit exceeded")) {
            return {
                title: "Rate Limit Exceeded",
                description:
                    "You've reached GitHub's API rate limit. Please try again later or authenticate to increase your rate limit.",
            };
        }

        if (error.message?.includes("Network Error")) {
            return {
                title: "Network Error",
                description:
                    "Unable to connect to GitHub. Please check your internet connection and try again.",
            };
        }

        return {
            title: "Error",
            description:
                "An unexpected error occurred. Please try again later.",
        };
    };
    /**
     * The handlePageChange function checks if the page is within a valid range, then triggers a search
     * and scrolls to the top of the page.
     */
    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination.totalPages) {
            searchRepositories(page);
            window.scrollTo(0, 0);
        }
    };

    /**
     * The function `viewCommits` is an asynchronous function that fetches commit data for a specific
     * repository and updates state variables accordingly, handling loading states, errors, and
     * navigation.
     */
    const viewCommits = async (repo, comitPage = 1) => {
        setSelectedRepo(repo);
        setLoading(true);
        const startTime = Date.now();
        try {
            const response = await axios.get("/api/getcommits", {
                params: { repo: repo.full_name, comitPage },
            });
            setCommits(response.data.items);
            setCommitPagination({
                currentPage: response.data.current_page,
                totalPages: response.data.total_pages,
                totalCount: response.data.total_count,
                itemsPerPage: response.data.per_page
            });
            const endTime = Date.now();
            const duration = endTime - startTime;
            setCurrentTimeCommit(duration);
            setErrorMessage("");
            setIsModalOpen(false);
            navigate("/commits");
        } catch (error) {
            const errorData = parseError(error.response.data);
            setErrorMessage(
                <>
                    <strong>{errorData.title}</strong>: {errorData.description}
                </>
            );
            setIsModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-300 p-4">
            <h1 className="text-3xl font-bold text-center mb-6">
                GitHub Repository Searching App
            </h1>

            {/* Modal Component for Error Messages */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                message={errorMessage}
            />
            {/* Using SearchBar Component */}
            <SearchField
                query={query}
                setQuery={setQuery}
                searchRepositories={searchRepositories}
            />

            {loading && <SpinnerModal />}
            <Routes>
                {/* Repository list page */}
                <Route
                    path="/"
                    element={
                        <>
                            {hasSearched && repositories.length === 0 ? (
                                <div className="space-y-4 border border-gray-300 p-4 rounded-md w-3/4 mx-auto bg-gray-500">
                                    <div className="p-4 bg-white rounded-md shadow-md">
                                        <h3 className="text-xl font-semibold">
                                            No repositories found
                                        </h3>
                                        <p className="text-gray-700">
                                            Please try searching with different
                                            keywords.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <RepositoryList
                                    totalCount={pagination.totalCount}
                                    repositories={repositories}
                                    viewCommits={viewCommits}
                                    currentTime={currentTime}
                                    searchTerm={query}
                                />
                            )}

                            {repositories.length > 0 && (
                                <Pagination
                                    currentPage={pagination.currentPage}
                                    totalPages={pagination.totalPages}
                                    totalCount={pagination.totalCount}
                                    itemsPerPage={pagination.itemsPerPage}
                                    handlePageChange={handlePageChange}
                                />
                            )}
                        </>
                    }
                />

                {/* Commits page */}
                <Route
                    path="/commits"
                    element={
                        <CommitList
                            selectedRepo={selectedRepo}
                            commits={commits}
                            currentTimeCommit={currentTimeCommit}
                            totalCountCommit={commitPagination.totalCount}
                            currentPage={commitPagination.currentPage}
                            totalPages={commitPagination.totalPages}
                            itemsPerPage={commitPagination.itemsPerPage}
                            viewCommits={viewCommits}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default Main;
