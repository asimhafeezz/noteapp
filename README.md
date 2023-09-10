# NoteApp

A simple application to manage notes with backend services, leveraging Redis and MySQL.

## Table of Contents

- [NoteApp](#noteapp)
  - [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)

## Getting Started

These instructions will guide you on how to get the project up and running on your local machine for development and testing purposes.

## Prerequisites

Before you begin, ensure you have the following installed:

- Docker
- Docker Compose

## Installation

1. **Clone the Repository**

```bash
   git clone https://github.com/asimhafeezz/noteapp.git
```

2. **Navigate to the Repository Folder**

```bash
cd noteapp
```

3. **Start the Containers**

```bash
docker-compose up
```

**Note:** On initial startup, you may need to restart the backend container once to ensure it connects with MySQL after MySQL is properly initialized.

## Usage

Once the containers are up and running:

- Access the backend services at the designated port.
- Interact with the MySQL database using your preferred client, connecting with the credentials specified in the `docker-compose.yml` file.
- Utilize Redis for caching or other operations as per your application's logic.
