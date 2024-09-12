# Media chronicle

MediaChronicle is a web application that allows users to view articles with interesting information, as well as publish their own articles and interact with other users.

## Key Features

- **User Registration**: Users can create accounts to post their own articles and interact with other registered users.
- **Article Management**: Registered users can create, edit, and delete their own articles.
- **Comments**: Registered users can leave comments on articles and delete comments on their own articles.
- **Favorites**: Users can like articles they enjoy and follow authors they find interesting.
- **Article Filtering by Tags**: This feature allows users to filter articles by various tags.
- **User Profile Management**: Users can edit information about their profile.
- **Database Storage**: User data and articles are stored in a remote database.
- **Authentication**: Users authenticate using an access token obtained from a remote server, which is stored locally and used for each server request as a header.
- **Responsive Design**: The application adapts to different screen sizes for optimal viewing on various devices.

## Technology Stack

- **Frontend**: Vue, Vuex, Vite, Axios.
- **Backend**: Remote server (RESTful API).

## Development

Run the development server with:
npm run dev
