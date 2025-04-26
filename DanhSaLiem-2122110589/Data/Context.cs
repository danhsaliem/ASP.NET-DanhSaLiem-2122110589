using DanhSaLiem_2122110589.Model;
using Microsoft.EntityFrameworkCore;

namespace DanhSaLiem_2122110589.Data

{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<User> Users { get; set; }
       protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Cấu hình Role mặc định cho User
            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasDefaultValue("user");  // Gán "user" làm giá trị mặc định cho Role
                
        }
    }
}
