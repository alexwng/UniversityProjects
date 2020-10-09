#include "Server.hpp"

Server *Server::pInstance = nullptr;

Server::Server()
{
    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) < 0)
    {
        std::cout << "Cannot create socket." << '\n';
    }

    address.sin_family = AF_INET;
    address.sin_addr.s_addr = htonl(INADDR_ANY);
    address.sin_port = htons(ATC::Port);

    if (bind(server_fd, (sockaddr *)&address, sizeof(address)) < 0)
    {
        std::cout << "Cannot bind socket." << '\n';
    }

    if (listen(server_fd, 10) < 0)
    {
        std::cout << "nuj ce face listen si backlog" << '\n';
    }
}

void Server::server_speaks(sf::Vertex foo, int without)
{
    for (auto &it : poolClients)
    {
        if (it != without)
            write(it, &foo, sizeof(foo));
    }
}

void Server::kill_him(int new_socket)
{

    for (int i = 0; i < poolClients.size(); i++)
    {
        if (poolClients[i] == new_socket)
        {
            std::swap(poolClients[i], poolClients[poolClients.size() - 1]);
            break;
        }
    }
    poolClients.pop_back();
}

void Server::connection_thread(int new_socket)
{
    while (true)
    {
        sf::Vertex foo;
        int valread = read(new_socket, &foo, sizeof(foo));
        if (foo.color == sf::Color::Red)
        {
            Instance()->kill_him(new_socket);
            break;
        }
        Instance()->server_speaks(foo, new_socket);
    }
    std::cout << "A iesit " << new_socket << '\n';
}

void Server::connection()
{
    while (true)
    {
        int new_socket;
        if (int addrlen; (new_socket = accept(server_fd, (sockaddr *)&address, (socklen_t *)&addrlen)) < 0)
        {
            std::cout << "Eroare la acceptare" << '\n';
        }

        std::thread(connection_thread, new_socket).detach();

        std::cout << "New connection on socket: " << new_socket << '\n';

        poolClients.push_back(new_socket);

        if (poolClients.size() == 4)
        {
            break;
        }
    }
}

Server *Server::Instance()
{
    if (!pInstance)
    {
        pInstance = new Server;
    }

    return pInstance;
}

void Server::ResetInstance()
{
    delete pInstance;
    pInstance = NULL;
}

Server::~Server()
{
    int rc = close(server_fd);
    std::cout << "Pa pa server. rc = " << rc << "." << '\n';
}