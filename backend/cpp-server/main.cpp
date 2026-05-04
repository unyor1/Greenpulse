#include <atomic>
#include <cctype>
#include <cstdlib>
#include <iostream>
#include <sstream>
#include <string>

#ifdef _WIN32
#include <winsock2.h>
#include <ws2tcpip.h>
#pragma comment(lib, "Ws2_32.lib")
#endif

namespace {

// LED state removed

std::string trim(const std::string& value) {
  size_t start = 0;
  while (start < value.size() && std::isspace(static_cast<unsigned char>(value[start]))) {
    ++start;
  }

  size_t end = value.size();
  while (end > start && std::isspace(static_cast<unsigned char>(value[end - 1]))) {
    --end;
  }

  return value.substr(start, end - start);
}

bool containsNoCase(const std::string& haystack, const std::string& needle) {
  if (needle.empty() || haystack.size() < needle.size()) {
    return false;
  }

  for (size_t i = 0; i <= haystack.size() - needle.size(); ++i) {
    bool match = true;
    for (size_t j = 0; j < needle.size(); ++j) {
      const char left = static_cast<char>(std::tolower(static_cast<unsigned char>(haystack[i + j])));
      const char right = static_cast<char>(std::tolower(static_cast<unsigned char>(needle[j])));
      if (left != right) {
        match = false;
        break;
      }
    }
    if (match) {
      return true;
    }
  }

  return false;
}

std::string normalizeJsonLike(const std::string& value) {
  std::string normalized;
  normalized.reserve(value.size());

  for (const char ch : value) {
    if (std::isspace(static_cast<unsigned char>(ch))) {
      continue;
    }
    normalized.push_back(static_cast<char>(std::tolower(static_cast<unsigned char>(ch))));
  }

  return normalized;
}

// parseLedFlag removed

std::string buildResponse(const std::string& status, const std::string& contentType, const std::string& body) {
  std::ostringstream out;
  out << "HTTP/1.1 " << status << "\r\n";
  out << "Content-Type: " << contentType << "\r\n";
  out << "Access-Control-Allow-Origin: *\r\n";
  out << "Access-Control-Allow-Methods: GET,POST,OPTIONS\r\n";
  out << "Access-Control-Allow-Headers: Content-Type\r\n";
  out << "Connection: close\r\n";
  out << "Content-Length: " << body.size() << "\r\n\r\n";
  out << body;
  return out.str();
}

bool receiveRequest(SOCKET clientSocket, std::string& request) {
  char buffer[4096];
  request.clear();

  while (true) {
    const int received = recv(clientSocket, buffer, static_cast<int>(sizeof(buffer)), 0);
    if (received <= 0) {
      break;
    }

    request.append(buffer, received);

    const size_t headerEnd = request.find("\r\n\r\n");
    if (headerEnd != std::string::npos) {
      const std::string headers = request.substr(0, headerEnd);
      size_t contentLength = 0;

      std::istringstream stream(headers);
      std::string line;
      while (std::getline(stream, line)) {
        line = trim(line);
        const std::string key = "content-length:";
        if (line.size() >= key.size() && containsNoCase(line.substr(0, key.size()), key)) {
          const std::string value = trim(line.substr(key.size()));
          contentLength = static_cast<size_t>(std::strtoul(value.c_str(), nullptr, 10));
        }
      }

      const size_t bodyStart = headerEnd + 4;
      if (request.size() >= bodyStart + contentLength) {
        return true;
      }
    }

    if (request.size() > 64 * 1024) {
      return false;
    }
  }

  return !request.empty();
}

std::string handleRequest(const std::string& rawRequest) {
  std::istringstream requestStream(rawRequest);
  std::string method;
  std::string path;
  std::string version;
  requestStream >> method >> path >> version;

  const size_t headerEnd = rawRequest.find("\r\n\r\n");
  const std::string body = (headerEnd == std::string::npos) ? "" : rawRequest.substr(headerEnd + 4);

  if (method == "OPTIONS") {
    return buildResponse("204 No Content", "text/plain", "");
  }

  if (method == "GET" && path == "/health") {
    return buildResponse("200 OK", "application/json", "{\"ok\":true}");
  }

  // LED API removed

  return buildResponse("404 Not Found", "application/json", "{\"error\":\"Route not found\"}");
}

}  // namespace

int main() {
#ifdef _WIN32
  WSADATA wsaData;
  if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
    std::cerr << "WSAStartup failed" << std::endl;
    return 1;
  }

  SOCKET serverSocket = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
  if (serverSocket == INVALID_SOCKET) {
    std::cerr << "socket() failed" << std::endl;
    WSACleanup();
    return 1;
  }

  sockaddr_in address{};
  address.sin_family = AF_INET;
  address.sin_addr.s_addr = INADDR_ANY;
  address.sin_port = htons(8080);

  if (bind(serverSocket, reinterpret_cast<sockaddr*>(&address), sizeof(address)) == SOCKET_ERROR) {
    std::cerr << "bind() failed. Port 8080 might already be in use." << std::endl;
    closesocket(serverSocket);
    WSACleanup();
    return 1;
  }

  if (listen(serverSocket, SOMAXCONN) == SOCKET_ERROR) {
    std::cerr << "listen() failed" << std::endl;
    closesocket(serverSocket);
    WSACleanup();
    return 1;
  }

  std::cout << "C++ backend listening on http://localhost:8080" << std::endl;

  while (true) {
    SOCKET clientSocket = accept(serverSocket, nullptr, nullptr);
    if (clientSocket == INVALID_SOCKET) {
      continue;
    }

    std::string request;
    if (receiveRequest(clientSocket, request)) {
      const std::string response = handleRequest(request);
      send(clientSocket, response.c_str(), static_cast<int>(response.size()), 0);
    }

    closesocket(clientSocket);
  }

  closesocket(serverSocket);
  WSACleanup();
#else
  std::cerr << "This sample server currently targets Windows (Winsock)." << std::endl;
  return 1;
#endif

  return 0;
}
