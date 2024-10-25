import React, { useState, useEffect } from "react";
import {
    Star,
    GitFork,
    Monitor,
    Calendar,
    Link as LinkIcon,
    Code,
    Eye,
    Lock,
    Globe,
    CodeIcon,
} from "lucide-react";
import BoldText from "./BoldText";
import { formatDate } from "../helpers/dateFormatter";

function RepositoryList({
    totalCount,
    repositories,
    viewCommits,
    currentTime,
    searchTerm,
}) {
    return (
        <div className="space-y-6 w-3/4 mx-auto">
            {/* Display the total count of repositories and the fetching time */}
            {repositories.length > 0 && (
                <div
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center
                      p-4 bg-gray-50 rounded-lg shadow-sm"
                >
                    <div className="flex items-center gap-2 mb-2 sm:mb-0">
                        <p className="text-xl font-semibold">
                            Total Repository : {totalCount}
                        </p>
                    </div>

                    {currentTime !== null && (
                        <div className="flex items-center gap-2">
                            <p className="text-gray-600">
                                Fetched in {currentTime} ms
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* The  code is  rendering a list of repositories. Itfirst checks if there are repositories available
             in the `repositories` array. If there are repositories, it maps over each repository and renders a
              list item for each one. */}
            {repositories.length > 0 ? (
                <ul className="space-y-4 border border-gray-300 p-4 rounded-md bg-gray-500">
                    {repositories.map((repo) => (
                        <li
                            key={repo.id}
                            className="p-4 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
                        >
                            {/* Repository Header */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
                                        <a
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="py-2  text-blue-600   flex items-center gap-2"
                                        >
                                            <LinkIcon className="h-4 w-4" />
                                            {repo.name}
                                        </a>
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {repo.full_name}
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="mt-3 text-gray-700">
                                <BoldText
                                    text={repo.description}
                                    query={searchTerm}
                                    wordLimit={50}
                                />
                            </p>

                            {/* Primary Stats */}
                            <div className="mt-4 flex flex-wrap gap-4">
                                <div className="flex items-center gap-1">
                                    <Star className="h-5 w-5 text-yellow-500" />
                                    <p>
                                        {repo.stargazers_count.toLocaleString()}{" "}
                                        stars
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <GitFork className="h-5 w-5 text-gray-500" />
                                    <p>
                                        {repo.forks_count.toLocaleString()}{" "}
                                        forks
                                    </p>
                                </div>
                                {repo.language && (
                                    <div className="flex items-center gap-1">
                                        <Monitor className="h-5 w-5 text-blue-500" />
                                        <p>{repo.language}</p>
                                    </div>
                                )}
                                <div className="flex items-center gap-1">
                                    <Eye className="h-5 w-5 text-purple-500" />
                                    <p>
                                        {repo.watchers_count.toLocaleString()}{" "}
                                        watchers
                                    </p>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="mt-3 text-sm text-gray-600 flex flex-wrap gap-4">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                        Updated {formatDate(repo.updated_at)}
                                    </span>
                                </div>
                                {repo.license && (
                                    <div className="flex items-center gap-1">
                                        <CodeIcon className="h-4 w-4" />
                                        <span>{repo.license.name}</span>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-4 flex gap-3">
                                <button
                                    onClick={() => viewCommits(repo)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
                                >
                                    <GitFork className="h-4 w-4" />
                                    View Commits
                                </button>

                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
                                >
                                    <LinkIcon className="h-4 w-4" />
                                    View Repository
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}

export default RepositoryList;
