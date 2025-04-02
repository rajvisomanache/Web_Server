# 🚀 HolyNarwhal - Simple Multithreaded C++ HTTP Server

This repository contains the source code for a basic multithreaded HTTP/1.1 web server written in C++. It serves static files and executes CGI scripts for dynamic content generation.

**(🌍 Note: HolyNarwhal was demonstrated live via ngrok at `https://holy-narwhal-literally.ngrok-free.app`. Free ngrok URLs are temporary, so this link may not be active.)**

## ✨ Features (Brief)

- **⚡ Multithreaded:** Handles multiple client connections concurrently.
- **📂 Static File Serving:** Serves HTML, CSS, JS, images, etc.
- **🖥️ CGI Support:** Executes scripts in `cgi-bin/` for dynamic content.
- **📜 Logging:** Logs requests, errors, and server actions.
- **⚙️ Configurable:** Modify key parameters like port, web root, and log file in `socket.cpp`.

## 🛠️ Prerequisites

- **🖥️ C++11+ Compiler:** Supports `<thread>`, `<mutex>`, etc.
- **🐧 POSIX OS:** Designed for Linux/macOS/WSL; limited Windows support.
- **📌 Make (Optional):** Simplifies compilation.
- **🌐 ngrok (Optional):** Expose the server online ([Download ngrok](https://ngrok.com/download)).

## 🏗️ Building & Running the Server

### 🔨 Compilation:
```bash
g++ socket.cpp -o socket -std=c++11 -pthread -Wall -Wextra
```

### 📂 Directory Structure:
```
.
├── ⚙️ socket         # Executable
├── 📁 www/            # Web root
│   ├── 🏠 index.html  # Default page
│   ├── 📜 cgi-bin/    # CGI scripts
│   └── 📖 logviewer.html # Log viewer page
└── 📄 server.log      # Auto-created log file
```

### ▶️ Running:
```bash
./socket
```

## 🌍 Hosted via ngrok
The HolyNarwhal server can be accessed online using ngrok. If active, the current link is:
```bash
https://holy-narwhal-literally.ngrok-free.app
```
To expose a new session:
```bash
ngrok http 8080
```

## 🌐 Accessing the Server
- **🏠 Locally:** `http://localhost:8080`
- **🔗 Via ngrok:** Use the generated public URL.

## ⚙️ Configuration
Modify constants in `socket.cpp` before recompiling:
- **📌 PORT:** Default `8080`
- **📂 WWW_ROOT:** Default `"www"`
- **📜 CGI_BIN_PATH:** Default `"/cgi-bin/"`
- **📝 LOG_FILE:** Default `"server.log"`

## ⚠️ Limitations
- **🔒 Security:** Lacks HTTPS and robust validation.
- **⚡ Performance:** Thread-per-connection model; not optimized for high loads.
- **📡 HTTP Compliance:** No Keep-Alive or advanced caching.

## 🤝 Contributing
Fork, improve, and submit pull requests. Issues and suggestions are welcome!

