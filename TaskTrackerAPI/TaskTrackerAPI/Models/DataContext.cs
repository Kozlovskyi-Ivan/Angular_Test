using Microsoft.EntityFrameworkCore;

namespace TaskTrackerAPI.Models
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<TaskNote> TaskNote { get; set; }

        public DbSet<TaskType> TaskTypes { get; set; }

    }
}
