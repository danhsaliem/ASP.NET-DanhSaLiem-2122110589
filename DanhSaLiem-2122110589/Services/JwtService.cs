// using System;
// using System.IdentityModel.Tokens.Jwt;
// using System.Security.Claims;
// using System.Text;
// using Microsoft.Extensions.Configuration;
// using Microsoft.IdentityModel.Tokens;

// namespace DanhSaLiem_2122110589.Services
// {
//     public class JwtService
//     {
//         private readonly IConfiguration _config;

//         public JwtService(IConfiguration config)
//         {
//             _config = config;
//         }

//         public string GenerateToken(string email)
//         {
//             var claims = new[]
//             {
//                 new Claim(ClaimTypes.Name, email),
//                 new Claim(JwtRegisteredClaimNames.Email, email),
                
//                 new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
//             };

//             var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
//             var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

//             var token = new JwtSecurityToken(
//                 issuer: _config["Jwt:Issuer"],
//                 audience: _config["Jwt:Audience"],
//                 claims: claims,
//                 expires: DateTime.UtcNow.AddHours(1),
//                 signingCredentials: creds
//             );

//             return new JwtSecurityTokenHandler().WriteToken(token);
//         }

//         public string ValidateToken(string token)
//         {
//             var tokenHandler = new JwtSecurityTokenHandler();
//             var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);

//             try
//             {
//                 var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
//                 {
//                     ValidateIssuer = true,
//                     ValidateAudience = true,
//                     ValidateLifetime = true,
//                     ValidateIssuerSigningKey = true,
//                     ValidIssuer = _config["Jwt:Issuer"],
//                     ValidAudience = _config["Jwt:Audience"],
//                     IssuerSigningKey = new SymmetricSecurityKey(key),
//                     ClockSkew = TimeSpan.Zero
//                 }, out SecurityToken validatedToken);

//                 return principal.Identity.Name; // trả về email
//             }
//             catch
//             {
//                 return null; // không hợp lệ
//             }
//         }
//     }
// }
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DanhSaLiem_2122110589.Services
{
    public class JwtService
    {
        private readonly IConfiguration _config;

        public JwtService(IConfiguration config)
        {
            _config = config;
        }

        // Sửa phương thức GenerateToken để nhận thêm tham số 'role'
        public string GenerateToken(string email, string role)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, email),
                new Claim(JwtRegisteredClaimNames.Email, email),
                new Claim(ClaimTypes.Role, role), // Thêm role vào claim
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Phương thức ValidateToken không thay đổi
        public string ValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);

            try
            {
                var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = _config["Jwt:Issuer"],
                    ValidAudience = _config["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                return principal.Identity.Name; // Trả về email
            }
            catch
            {
                return null; // Không hợp lệ
            }
        }
    }
}

