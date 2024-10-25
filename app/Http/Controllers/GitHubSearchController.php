<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class GitHubSearchController extends Controller
{
    private $client;


    /**
     * The function initializes a new instance of the Client class with a base URI for the GitHub API.
     */
    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://api.github.com/',
            //'headers' => ['Authorization' => 'token ' . env('GITHUB_TOKEN')]
        ]);
    }

    /**
     * The function performs a search for repositories based on a query string and paginates the
     * results.
     *
     * @param Request request The `search` function you provided is responsible for searching
     * repositories based on a query string. Let's break down the parameters used in this function:
     *
     * @return The `search` function is returning a JSON response with information about the search
     * results for repositories based on the provided query. The response includes the total count of
     * repositories found, the items (repositories) themselves, the current page number, the number of
     * items per page, and the total number of pages based on the pagination.
     */
    public function search(Request $request)
    {
        $query = $request->input('query');
        $page =  $request->get('page', 1);
        $perPage = $request->get('per_page', 10);

        $cacheKey = "repositories_{$query}_page_{$page}_perPage_{$perPage}";

        if (empty($query)) {
            return response()->json([
                'error' => 'Search query is required'
            ], 400);
        }

        $repositories = Cache::remember($cacheKey, 60, function () use ($query, $page, $perPage) {
            $response = $this->client->get('search/repositories', [
                'query' => [
                    'q' => $query,
                    'page' => $page,
                    'sort' => 'stars',
                    'per_page' => $perPage,
                ],
            ]);

            return json_decode($response->getBody()->getContents(), true);
        });


        return response()->json([
            'total_count' => $repositories['total_count'],
            'items' => $repositories['items'],
            'current_page' => $page,
            'per_page' => $perPage,
            'total_pages' => ceil($repositories['total_count'] / $perPage),
        ]);
    }

    /**
     * The function retrieves commits from a GitHub repository based on the provided parameters and
     * returns them in a JSON response.
     *
     * @param Request request The `commits` function you provided seems to be handling a request to
     * fetch commits from a GitHub repository. Let's break down the parameters used in this function:
     *
     * @return The function `commits` is returning a JSON response containing information about commits
     * from a GitHub repository. The response includes an array of commit items, the current page
     * number, the number of items per page, the total count of commits, and the total number of pages
     * calculated based on the total count and items per page.
     */
    public function commits(Request $request)
    {
        $repo = $request->input('repo');
        $page = $request->input('comitPage', 1);
        $perPage = $request->input('per_page', 10);
        $cacheKey = 'github_commits_' . $repo . '_page_' . $page . '_perPage_' . $perPage;

        $countResponse = $this->client->get("repos/{$repo}/commits", [
            'query' => [
                'per_page' => 1
            ],
        ]);
        $linkHeader = $countResponse->getHeader('Link');
        $totalCommits = null;
        if (!empty($linkHeader)) {
            $totalCommits = $this->parseLinkHeaderForTotalCommits($linkHeader[0]);
        }
        $commits = Cache::remember($cacheKey, 60, function () use ($repo, $page, $perPage, $totalCommits) {
            $response = $this->client->get("repos/{$repo}/commits", [
                'query' => [
                    'page' => $page,
                    'per_page' => $perPage,
                ]
            ]);


            $commits = json_decode($response->getBody()->getContents(), true);

            return [
                'items' => $commits,
                'current_page' => $page,
                'per_page' => $perPage,
                'total_count' => $totalCommits,
                'total_pages' => ceil($totalCommits / $perPage)
            ];
        });


        return response()->json($commits);
    }

    /**
     * The function `parseLinkHeaderForTotalCommits` extracts the total number of pages from a link
     * header containing pagination information.
     *
     * @param linkHeader The `parseLinkHeaderForTotalCommits` function is designed to extract the total
     * number of pages from a Link header string. The Link header is typically used in HTTP responses
     * to provide links to related resources.
     *
     * @return the total number of pages of commits by parsing the "link" header from an HTTP response.
     * It looks for the link with the relationship "last" and extracts the page number from it. If
     * found, it returns the last page number as an integer. If no such link is found, it returns null.
     */
    private function parseLinkHeaderForTotalCommits($linkHeader)
    {

        $links = explode(',', $linkHeader);
        foreach ($links as $link) {
            if (strpos($link, 'rel="last"') !== false) {
                preg_match('/&page=(\d+)/', $link, $matches);
                if (isset($matches[1])) {
                    $lastPage = (int) $matches[1];
                    return $lastPage;
                }
            }
        }
        return null;
    }
}
