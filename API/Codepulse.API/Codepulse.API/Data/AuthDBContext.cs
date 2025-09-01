using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Codepulse.API.Data
{
    public class AuthenticationDbContext : IdentityDbContext
    {
        public AuthenticationDbContext(DbContextOptions <AuthenticationDbContext> options) : base(options)
        {
        }

        

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var ReaderRoleID = "0e66a924-e4b7-49e9-83ed-ca62ea16e050";
            var writerRoleID = "95995134-2639-4440-8f50-3ce64c6da2c9";

            // Create Reader and write Role

            var roles = new List<IdentityRole>

            {
                new IdentityRole()
                {
                    Id = ReaderRoleID,
                    Name = "Reader",
                    NormalizedName = "READER".ToUpper(),
                    ConcurrencyStamp = ReaderRoleID
                },

                new IdentityRole()
                {
                    Id = writerRoleID,
                    Name = "Writer",
                    NormalizedName = "WRITER".ToUpper(),
                    ConcurrencyStamp = writerRoleID
                }

            }; 

            // seed the roles
            builder.Entity<IdentityRole>().HasData(roles);

            // create a super admin user
            var superAdminID = "8e36f558-fe44-460e-a515-316906caadeb";

            var admin = new IdentityUser
            {
                
                Id = superAdminID,
                UserName  = "zu4425@gmail.com",
                Email = "zu4425@gmail.com",
                NormalizedEmail = "zu4425@gmail.com".ToUpper(),
                NormalizedUserName = "zu4425@gmail.com".ToUpper(),


            };
            admin.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(admin, "zain1234");

            builder.Entity<IdentityUser>().HasData(admin);

            // Give Roles to super admin user

            var adminRoles = new List<IdentityUserRole<string>>()
            {
                new IdentityUserRole<string>()
                {
                    RoleId = ReaderRoleID,
                    UserId = superAdminID
                },
                new IdentityUserRole<string>()
                {
                    RoleId = writerRoleID,
                    UserId = superAdminID
                }
            };

            builder.Entity<IdentityUserRole<string>>().HasData(adminRoles);
        }

    }

    
}
