﻿using API.Entities;
using API.Helpers;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.Text.RegularExpressions;
using API.DTOs;
using Group = API.Entities.Group;
using Connection = API.Entities.Connection;

namespace API.Interfaces
{

    public interface IMessageRepository
    {
        void AddMessage(Message message);
        void DeleteMessage(Message message);
        Task<Message> GetMessage(int id);
        Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams);
      
        Task<IEnumerable<MessageDto>> GetMessageThread(string currentUserName, string recipientUserName);
        
        Task<bool> SaveAllAsync();
        void AddGroup(Group group);
        void RemoveConnection(Connection connection);
        Task<Connection> GetConnectionAsync(string connectionId);
        Task<Group> GetMessageGroupAsync(string groupName);
        Task<Group> GetGroupForConnection(string connectionId);
    }

}
