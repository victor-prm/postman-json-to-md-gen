These docs are auto-generated from postman_collection.json. This is a homemade script, as I did not like the other json-to-md libraries I found out there.

# Book Tracker

A RESTful API for managing books, authors, and genres. It allows clients to:

- Retrieve lists of books, authors, and genres with optional pagination.
    
- View detailed information about a single book, author, or genre.
    
- Add or update books and authors (editor/admin only).
    
- Delete books (admin only).
    

All GET requests are publicly accessible. Modifying data is restricted based on user roles: **editor** for creating/updating and **admin** for deletion. Each resource includes hypermedia links for easy navigation between previous and next items.

## 🔐 Base URL and tokens

| Type | Key | Value |
|---|---|---|
| ![VARIABLE](https://img.shields.io/badge/VARIABLE-darkslategrey?style=flat&logoColor=white) | `base_url` | `http://localhost:8888/booktracker` |
| ![HEADER](https://img.shields.io/badge/HEADER-orange?style=flat&logoColor=white) | `X-Authorization` | `Bearer EDITOR_TOKEN` |
| ![HEADER](https://img.shields.io/badge/HEADER-orange?style=flat&logoColor=white) | `X-Authorization` | `Bearer ADMIN_TOKEN` |


## 📁 1. Books endpoint

Manage and retrieve information about books in the API. Each book includes expandable metadata such as title, authors, main genre, subgenres, publication year, page count, reading status, frontpage image, and summary. Endpoints allow listing, fetching single books, and (for authorized users) creating, updating, or deleting books.

**1. All Books - Paginated** 


![GET](https://img.shields.io/badge/GET-mediumseagreen?style=flat&logoColor=white) `/books?offset=20&limit=3` 


![Public](https://img.shields.io/badge/Public-honeydew?style=flat&logoColor=white)




---



**2. All Books - Expanded** 


![GET](https://img.shields.io/badge/GET-mediumseagreen?style=flat&logoColor=white) `/books?expand=genres,authors,frontpage_img,year,description` 


![Public](https://img.shields.io/badge/Public-honeydew?style=flat&logoColor=white)




---



**3. All Books - Filter** 


![GET](https://img.shields.io/badge/GET-mediumseagreen?style=flat&logoColor=white) `/books?main_genre_id=11&sub_genre_id=14` 


![Public](https://img.shields.io/badge/Public-honeydew?style=flat&logoColor=white)




---



**4. All Books - Search** 


![GET](https://img.shields.io/badge/GET-mediumseagreen?style=flat&logoColor=white) `/books?q=society` 


![Public](https://img.shields.io/badge/Public-honeydew?style=flat&logoColor=white)




---



**5. Single Book** 


![GET](https://img.shields.io/badge/GET-mediumseagreen?style=flat&logoColor=white) `/books?id=9` 


![Public](https://img.shields.io/badge/Public-honeydew?style=flat&logoColor=white)




---



**6. New Book** 


![POST](https://img.shields.io/badge/POST-goldenrod?style=flat&logoColor=white) `/books/` 


![Editor](https://img.shields.io/badge/Editor-beige?style=flat&logoColor=white) ![Admin](https://img.shields.io/badge/Admin-mistyrose?style=flat&logoColor=white)




---



**7. Edit Book** 


![PUT](https://img.shields.io/badge/PUT-royalblue?style=flat&logoColor=white) `/books?id=74` 


![Editor](https://img.shields.io/badge/Editor-beige?style=flat&logoColor=white) ![Admin](https://img.shields.io/badge/Admin-mistyrose?style=flat&logoColor=white)




---



**8. Delete Book** 


![DELETE](https://img.shields.io/badge/DELETE-salmon?style=flat&logoColor=white) `/books?id=74` 


![Admin](https://img.shields.io/badge/Admin-mistyrose?style=flat&logoColor=white)




---



**9. All Books** 


![OPTIONS](https://img.shields.io/badge/OPTIONS-deeppink?style=flat&logoColor=white) `/books` 


![Public](https://img.shields.io/badge/Public-honeydew?style=flat&logoColor=white)




---



## 📁 2. Authors endpoint

Manage and retrieve author information. Each author entry includes name, biography, birth year, and a list of their associated books. Endpoints allow listing all authors, fetching details for a single author, and (for authorized users) adding or updating author records.

**1. All Authors - Paginated** 


![GET](https://img.shields.io/badge/GET-mediumseagreen?style=flat&logoColor=white) `/authors` 


![Public](https://img.shields.io/badge/Public-honeydew?style=flat&logoColor=white)




---



**2. All Authors - Filter** 


![GET](https://img.shields.io/badge/GET-mediumseagreen?style=flat&logoColor=white) `/authors?birth_year=1892` 


![Public](https://img.shields.io/badge/Public-honeydew?style=flat&logoColor=white)




---



**3. All Authors - Search** 


![GET](https://img.shields.io/badge/GET-mediumseagreen?style=flat&logoColor=white) `/authors?q=her` 


![Public](https://img.shields.io/badge/Public-honeydew?style=flat&logoColor=white)




---



**4. Single Author** 


![GET](https://img.shields.io/badge/GET-mediumseagreen?style=flat&logoColor=white) `/authors?id=4` 


![Public](https://img.shields.io/badge/Public-honeydew?style=flat&logoColor=white)




---



**5. New Author** 


![POST](https://img.shields.io/badge/POST-goldenrod?style=flat&logoColor=white) `/authors/` 


![Editor](https://img.shields.io/badge/Editor-beige?style=flat&logoColor=white) ![Admin](https://img.shields.io/badge/Admin-mistyrose?style=flat&logoColor=white)




---



**6. Edit Author** 


![PUT](https://img.shields.io/badge/PUT-royalblue?style=flat&logoColor=white) `/authors?id=71` 


![Editor](https://img.shields.io/badge/Editor-beige?style=flat&logoColor=white) ![Admin](https://img.shields.io/badge/Admin-mistyrose?style=flat&logoColor=white)




---



**7. Delete Author** 


![DELETE](https://img.shields.io/badge/DELETE-salmon?style=flat&logoColor=white) `/authors?id=71` 


![Admin](https://img.shields.io/badge/Admin-mistyrose?style=flat&logoColor=white)




---



**8. All Authors** 


![OPTIONS](https://img.shields.io/badge/OPTIONS-deeppink?style=flat&logoColor=white) `/authors` 


![Public](https://img.shields.io/badge/Public-honeydew?style=flat&logoColor=white)




---



## 📁 3. Genres endpoint

Manage and retrieve genre information for books. Each genre includes its name and a list of books associated with it, either as main genre or subgenre. Endpoints allow listing all genres, fetching details for a single genre, and browsing books by genre.

**1. All Genres - Paginated** 


![GET](https://img.shields.io/badge/GET-mediumseagreen?style=flat&logoColor=white) `/genres` 


![Public](https://img.shields.io/badge/Public-honeydew?style=flat&logoColor=white)




---



**2. Single Genre** 


![GET](https://img.shields.io/badge/GET-mediumseagreen?style=flat&logoColor=white) `/genres?id=5` 


![Public](https://img.shields.io/badge/Public-honeydew?style=flat&logoColor=white)




---



**3. All Genres** 


![OPTIONS](https://img.shields.io/badge/OPTIONS-deeppink?style=flat&logoColor=white) `/genres` 


![Public](https://img.shields.io/badge/Public-honeydew?style=flat&logoColor=white)




---



