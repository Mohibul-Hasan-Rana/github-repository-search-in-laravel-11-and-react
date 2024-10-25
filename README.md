<h1 align="center">GitHub Repository Searching App<h1>



## Overview

This application is a GitHub Repository Explorer built with Laravel and React, designed to help users search and explore GitHub repositories with ease. The app features a streamlined interface that enables users to search for repositories, view detailed information on individual repositories, and explore recent commits. With pagination, error handling, and API rate-limit awareness, this tool ensures a smooth experience for navigating large search results, while also gracefully handling common issues like network interruptions or GitHub's search result limits. This project is a great tool for developers looking to discover new projects or analyze trends in open-source software.



## Prerequisites
- PHP Version >= 8.3
- Uncomment extension=pdo_sqlite and extension=sqlite3 lines in php.ini file if not uncommented.

## Installation
 1. Clone the repository from: ``` git clone https://github.com/Mohibul-Hasan-Rana/github-repository-search-in-laravel-11-and-react.git ```

 2. Navigate to the project directory: ```cd your-repo-name```

 3. Install dependencies: ```composer install```

 4. Set up environment variables: ```cp .env.example .env```

 5. Generate an application key: ```php artisan key:generate```

 6. Set up the database: ```php artisan migrate```

 7. Write yes if the text Would you like to create it? (yes/no) shows

 8. Run those command ```php artisan dumpautoload``` and ```php artisan config:cache```

 ## Usage 

 1. Run this command: ```php artisan serve```

 2. Paste this URL in browser: http://127.0.0.1:8000/ 

