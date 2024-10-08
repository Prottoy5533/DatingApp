﻿using API.Data;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Runtime.InteropServices;

namespace API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            if (!resultContext.HttpContext.User.Identity.IsAuthenticated) return;

            var userId = resultContext.HttpContext.User.GetUserId();
            var repo = resultContext.HttpContext.RequestServices.GetRequiredService<IUserRepository>();
            var user = await repo.GetUserByIdAsync(userId);
            user.LastActive = DateTime.UtcNow;
            repo.Update(user);
            //var userId = resultContext.HttpContext.User.GetUserId();

            //var uow = resultContext.HttpContext.RequestServices.GetRequiredService<IUnitOfWork>();
            //var user = await uow.UserRepository.GetUserByIdAsync(userId);
            //user.LastActive = DateTime.UtcNow;
            //await uow.Complete();
        }
    }
}
