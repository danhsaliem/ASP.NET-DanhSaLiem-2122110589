using DanhSaLiem_2122110589.Model;
using DanhSaLiem_2122110589.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DanhSaLiem_2122110589.Services;
using BCrypt.Net;

namespace DanhSaLiem_2122110589.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext pro;
        private readonly JwtService _jwtService;

        public UserController(AppDbContext context, JwtService jwtService)
        {
            pro = context;
            _jwtService = jwtService;
        }

        // Đăng ký người dùng
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Register model)
        {
            try
            {
                // Kiểm tra nếu email đã tồn tại trong cơ sở dữ liệu
                if (pro.Users.Any(u => u.Email == model.Email))
                    return BadRequest(new { message = "Email đã được sử dụng" });

                // Mã hóa mật khẩu
                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);

                // Tạo đối tượng User mới
                var user = new User
                {
                    Name = model.Name,
                    Email = model.Email,
                    Phone = model.Phone,
                    Password = hashedPassword,
                    Address = model.Address,
                    Description = model.Description
                };

                // Thêm người dùng mới vào cơ sở dữ liệu
                pro.Users.Add(user);
                await pro.SaveChangesAsync();

                // Tạo token cho người dùng
                var token = _jwtService.GenerateToken(user.Email);

                // Trả về phản hồi với thông tin người dùng và token
                return Ok(new
                {
                    message = "Đăng ký thành công",
                    token,
                    user.Name,
                    user.Email
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
                // Lấy token từ header
                var authHeader = HttpContext.Request.Headers["Authorization"].ToString();
                if (string.IsNullOrEmpty(authHeader))
                    return Unauthorized(new { message = "Bạn cần cung cấp token" });

                // Lấy token sau "Bearer " nếu có
                var token = authHeader.StartsWith("Bearer ") ? authHeader.Substring("Bearer ".Length) : authHeader;

                // Xác minh token
                var emailFromToken = _jwtService.ValidateToken(token);
                if (emailFromToken == null)
                    return Unauthorized(new { message = "Token không hợp lệ" });

                // So sánh token với email người dùng đang nhập
                if (emailFromToken != model.Email)
                    return Unauthorized(new { message = "Token không khớp với email đăng nhập" });

                // Kiểm tra người dùng và mật khẩu
                var user = pro.Users.SingleOrDefault(u => u.Email == model.Email);
                if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
                    return Unauthorized(new { message = "Sai email hoặc mật khẩu" });

                // Tạo token mới cho người dùng
                var newToken = _jwtService.GenerateToken(user.Email);

                // Trả về phản hồi với thông tin người dùng và token
                return Ok(new
                {
                    message = "Đăng nhập thành công",
                    token = newToken,
                    user.Name,
                    user.Email
                });
            }
            catch (Exception ex)
            {
                // Ghi lại lỗi vào log (console hoặc file log)
                Console.WriteLine($"Error occurred: {ex.Message}");
                return StatusCode(500, new { message = "Đã có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại sau." });
            }
        }
    }
}
