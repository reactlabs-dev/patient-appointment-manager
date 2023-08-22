# Patient Appointment Manager



**Patient Appointment Manager** is a full-stack React application that simplifies the management of patient appointments in a healthcare setting. The application interfaces with a backend server using RESTful APIs and integrates real-time features via WebSockets to ensure instantaneous updates on appointment statuses across all active clients.

## Features:

- **Real-time Appointment Updates**: Any changes in the status of an appointment are immediately reflected to all connected clients using WebSockets, ensuring that the staff always has the most up-to-date information.
  
- **Intuitive UI**: Leveraging Material-UI, the application offers a rich user interface with appointment cards, modals, and other interactive elements for an enhanced user experience.
  
- **CRUD Functionalities**: Staff can create new appointments, read and list existing ones, update the status of an appointment, or delete appointments as needed.

## Tech Stack:

### Frontend:
- **React**: For building the user interface.
- **TypeScript**: For adding static typing to the React application.
- **Material-UI**: For designing the UI components.
- **WebSockets**: For real-time bi-directional communication between the client and the server.

### Backend:
- **Express**: Node.js framework for building the RESTful API.
- **WebSockets**: For managing real-time data flow.

## Getting Started:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/reactlabs-dev/patient-appointment-manager.git
    ```
2. **Navigate to the directory**:
    ```bash
    cd [repository name]
    ```
3. **Install Dependencies**:
    ```bash
    npm install
    ```
4. **Run the Backend**:
    ```bash
    npm run server
    ```
5. **Run the Frontend** (in a different terminal window/tab):
    ```bash
    npm start
    ```

Visit `http://localhost:3000` in your browser to access the application.

## Contributing:

Feel free to fork this repository, make changes, and submit pull requests. Any feedback or suggestions are welcome!

## License

MIT License

Copyright (c) 2023 React Labs, Inc. (www.reactlabs.io)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

