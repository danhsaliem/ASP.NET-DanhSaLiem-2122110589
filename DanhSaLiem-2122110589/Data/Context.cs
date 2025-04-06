using DanhSaLiem_2122110589.Model;
using Microsoft.EntityFrameworkCore;

namespace DanhSaLiem_2122110589.Data

{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
        // public DbSet<Category> Category { get; set; }
        // public DbSet<User> Users { get; set; }
    }
}
