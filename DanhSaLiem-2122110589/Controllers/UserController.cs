// using DanhSaLiem_2122110589.Model;
// using DanhSaLiem_2122110589.Data;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using DanhSaLiem_2122110589.Services;
// using BCrypt.Net;

// namespace DanhSaLiem_2122110589.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class UserController : ControllerBase
//     {
//         private readonly AppDbContext pro;
//         private readonly JwtService _jwtService;

//         public UserController(AppDbContext context, JwtService jwtService)
//         {
//             pro = context;
//             _jwtService = jwtService;
//         }

//         // Đăng ký người dùng
//         [HttpPost("register")]
//         public async Task<IActionResult> Register([FromBody] Register model)
//         {
//             try
//             {
//                 // Kiểm tra nếu email đã tồn tại trong cơ sở dữ liệu
//                 if (pro.Users.Any(u => u.Email == model.Email))
//                     return BadRequest(new { message = "Email đã được sử dụng" });

//                 // Mã hóa mật khẩu
//                 var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);

//                 // Tạo đối tượng User mới
//                 var user = new User
//                 {
//                     Name = model.Name,
//                     Email = model.Email,
//                     Phone = model.Phone,
//                     Password = hashedPassword,
//                     Address = model.Address,
//                     Description = model.Description
//                 };

//                 // Thêm người dùng mới vào cơ sở dữ liệu
//                 pro.Users.Add(user);
//                 await pro.SaveChangesAsync();

//                 // Tạo token cho người dùng
//                 var token = _jwtService.GenerateToken(user.Email);

//                 // Trả về phản hồi với thông tin người dùng và token
//                 return Ok(new
//                 {
//                     message = "Đăng ký thành công",
//                     token,
//                     user.Name,
//                     user.Email
//                 });
//             }
//             catch (Exception ex)
//             {
//                 // Ghi lại lỗi vào log (console hoặc file log)
//                 Console.WriteLine($"Error occurred: {ex.Message}");
//                 return StatusCode(500, new { message = "Đã có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại sau." });
//             }
//         }

//         // Đăng nhập người dùng
//        [HttpPost("login")]
// public IActionResult Login([FromBody] Login model)
// {
//     try
//     {
//         // Kiểm tra người dùng có tồn tại hay không
//         var user = pro.Users.SingleOrDefault(u => u.Email == model.Email);
//         if (user == null)
//             return Unauthorized(new { message = "Email không tồn tại" });

//         // Kiểm tra mật khẩu
//         if (!BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
//             return Unauthorized(new { message = "Sai mật khẩu" });

//         // Tạo token mới cho người dùng
//         var token = _jwtService.GenerateToken(user.Email);

//         // Trả về phản hồi với thông tin người dùng và token
//         return Ok(new
//         {
//             message = "Đăng nhập thành công",
//             token = token,
//             user = new
//             {
//                 user.Name,
//                 user.Email,
//                 user.Phone,
//                 user.Address,
//                 user.Description
//             },
//             roles = new[] { "user" } // Nếu bạn muốn role, thêm đúng theo logic hệ thống
//         });
//     }
//     catch (Exception ex)
//     {
//         Console.WriteLine($"Error occurred: {ex.Message}");
//         return StatusCode(500, new { message = "Đã có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại sau." });
//     }
// }
//     }
// }
using DanhSaLiem_2122110589.Model;
using DanhSaLiem_2122110589.Data;
using Microsoft.AspNetCore.Mvc;
using DanhSaLiem_2122110589.Services;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;

namespace DanhSaLiem_2122110589.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly JwtService _jwtService;

        public UserController(AppDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        // Đăng ký người dùng
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Register model)
        {
            try
            {
                // Kiểm tra nếu email đã tồn tại trong cơ sở dữ liệu
                if (_context.Users.Any(u => u.Email == model.Email))
                    return BadRequest(new { message = "Email đã được sử dụng" });

                // Mã hóa mật khẩu
                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);

                // Tạo đối tượng User mới và gán giá trị Role
                var user = new User
                {
                    Name = model.Name,
                    Email = model.Email,
                    Phone = model.Phone,
                    Password = hashedPassword,
                    Address = model.Address,
                    Description = model.Description,
                    Role = "user"  // Gán role mặc định là "user"
                };

                // Thêm người dùng mới vào cơ sở dữ liệu
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                // Tạo token cho người dùng
                var token = _jwtService.GenerateToken(user.Email, user.Role);

                // Trả về phản hồi với thông tin người dùng và token
                return Ok(new
                {
                    message = "Đăng ký thành công",
                    token,
                    user.Name,
                    user.Email,
                    user.Role  // Trả về Role
                });
            }
            catch (Exception ex)
            {
                // Ghi lại lỗi vào log (console hoặc file log)
                Console.WriteLine($"Error occurred: {ex.Message}");
                return StatusCode(500, new { message = "Đã có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại sau." });
            }
        }

        // Đăng nhập người dùng
        [HttpPost("login")]
        public IActionResult Login([FromBody] Login model)
        {
            try
            {
                var user = _context.Users.SingleOrDefault(u => u.Email == model.Email);
                if (user == null)
                    return Unauthorized(new { message = "Email không tồn tại" });

   
                if (!BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
                    return Unauthorized(new { message = "Sai mật khẩu" });


                var token = _jwtService.GenerateToken(user.Email, user.Role);

  
                return Ok(new
                {
                    message = "Đăng nhập thành công",
                    token = token,
                    user = new
                    {
                        user.Id,
                        user.Name,
                        user.Email,
                        user.Phone,
                        user.Address,
                        user.Description,
                        user.Role  
                    },
                    roles = new[] { user.Role }  
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occurred: {ex.Message}");
                return StatusCode(500, new { message = "Đã có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại sau." });
            }
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _context.Users.ToList();
            return Ok(new { users });
        }

        // GET: api/user/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null) return NotFound("Không tìm thấy người dùng");
            return Ok(user);
        }

[HttpPost("create")]
public async Task<IActionResult> CreateUser([FromBody] Register model)
{
    try
    {

        if (_context.Users.Any(u => u.Email == model.Email))
            return BadRequest(new { message = "Email đã được sử dụng" });


        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);


        var user = new User
        {
            Name = model.Name,
            Email = model.Email,
            Phone = model.Phone,
            Password = hashedPassword,
            Address = model.Address,
            Description = model.Description,
            Role = "user"  
        };


        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        // Trả về phản hồi với thông tin người dùng mới
        return CreatedAtAction(nameof(GetById), new { id = user.Id }, new
        {
            message = "Người dùng đã được tạo thành công",
            user = new
            {
                user.Id,
                user.Name,
                user.Email,
                user.Phone,
                user.Address,
                user.Description,
                user.Role
            }
        });
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error occurred: {ex.Message}");
        return StatusCode(500, new { message = "Đã có lỗi xảy ra trong quá trình tạo người dùng. Vui lòng thử lại sau." });
    }
}

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            user.Name = updatedUser.Name;
            user.Email = updatedUser.Email;
            user.Phone = updatedUser.Phone;
            user.Address = updatedUser.Address;
            user.Description = updatedUser.Description;

            await _context.SaveChangesAsync();

            return Ok(user);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User deleted successfully" });
        }
    }
}
