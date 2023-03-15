using InforceTestTask.Models.EntityModels;
using Microsoft.EntityFrameworkCore;

namespace InforceTestTask
{
    public class ApplicationContext: DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<URL> URLs { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>().HasKey(el => el.Id);
            builder.Entity<User>().HasIndex(el => el.Login).IsUnique();
            builder.Entity<User>().HasIndex(el => el.Password).IsUnique();

            builder.Entity<URL>().HasKey(el => el.Id);
            builder.Entity<URL>().HasIndex(el => el.ShortUrl).IsUnique();
            builder.Entity<URL>().HasIndex(el => el.LongUrl).IsUnique();
            builder.Entity<URL>().HasIndex(el => el.Date).IsUnique();
            //builder.Entity<URL>()

        }
    }
}
