import React from "react";
import { useNavigate } from "react-router-dom";
import {
    GitCommit,
    User,
    Calendar,
    ChevronRight,
    ChevronLeft,
    GitBranch,
    Link as LinkIcon,
} from "lucide-react";
import Pagination from "./Pagination";
import { formatDate } from "../helpers/dateFormatter";

const CommitList = ({
    selectedRepo,
    commits,
    totalCountCommit,
    currentTimeCommit,
    totalPages,
    itemsPerPage,
    currentPage,
    viewCommits,
}) => {
    const navigate = useNavigate();

    /**
     * The function `handlePageChangeCommit` is used to handle page changes for viewing commits in a
     * repository.
     */
    const handlePageChangeCommit = (selectedRepo, comitPage) => {
        if (comitPage >= 1 && comitPage <= totalPages) {
            viewCommits(selectedRepo, comitPage);
            window.scrollTo(0, 0);
        }
    };

    if (!selectedRepo) {
        return  (
            <div className="space-y-4 border border-gray-300 p-4 rounded-md w-3/4 mx-auto bg-gray-500">
                <div className="p-4 bg-white rounded-md shadow-md">
                    <h3 className="text-xl font-semibold">
                        No repository selected.
                    </h3>
                    <p className="text-gray-700">
                        Please write something in the search field and press Enter or click on Search button.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-6 w-3/4 mx-auto">
                <div className="flex gap-8 items-center  border-b pb-4">
                    {/* Back to Repositories Button */}
                    <button
                        onClick={() => navigate("/")}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200 flex items-center gap-2 group"
                    >
                        <ChevronLeft className="h-5 w-5" />
                        Back
                    </button>

                    {/* Commits for Repository Title */}
                    <h5 className="text-base font-medium flex items-center gap-2 ml-auto">
                        <span className="font-bold text-blue-600">
                            {selectedRepo?.name || "Unknown Repository"}
                        </span>
                    </h5>
                </div>

                {/* This part of the code is conditionally rendering a section that displays information
                about the total number of commits and the time taken to fetch the commits*/}
                {commits.length > 0 && (
                    <div
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center
                      p-4 bg-gray-50 rounded-lg shadow-sm"
                    >
                        <div className="flex items-center gap-2 mb-2 sm:mb-0">
                            <p className="text-xl font-semibold">
                                Total Commits : {totalCountCommit}
                            </p>
                        </div>

                        {currentTimeCommit !== null && (
                            <div className="flex items-center gap-2">
                                <p className="text-gray-600">
                                    Fetched in {currentTimeCommit} ms
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* This part of the code is rendering a list of commits for a selected repository*/}
                <ul className="space-y-4 border border-gray-300 p-4 rounded-md bg-gray-500">
                    {commits.map((commit, index) => (
                        <li
                            key={index}
                            className="p-4 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
                        >
                            {/* Commit Message Section */}
                            <div className="flex items-start gap-2 mb-3">
                                <GitCommit className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold break-words">
                                        {commit.commit.message}
                                    </p>
                                </div>
                            </div>

                            {/* Author Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-gray-500" />
                                    <span>
                                        Author: {commit.commit.author.name}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                    <span>
                                        {formatDate(commit.commit.author.date)}
                                    </span>
                                </div>
                            </div>

                            {/* Additional Commit Details */}
                            <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                {/* GitHub Link */}
                                {commit.html_url && (
                                    <div className="flex items-center gap-2">
                                        <LinkIcon className="w-4 h-4 text-blue-500" />
                                        <a
                                            href={commit.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-700 hover:underline"
                                        >
                                            View on GitHub
                                        </a>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {/* This part of the code is conditionally rendering the `Pagination` component only if the
            `commits` array has a length greater than 0. */}
            {commits.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalCount={totalCountCommit}
                    itemsPerPage={itemsPerPage}
                    handlePageChange={(page) =>
                        handlePageChangeCommit(selectedRepo, page)
                    }
                />
            )}
        </>
    );
};

export default CommitList;
