// using DanhSaLiem_2122110589.Data;
// using DanhSaLiem_2122110589.Services;
// using Microsoft.AspNetCore.Authentication.JwtBearer;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.IdentityModel.Tokens;
// using Microsoft.OpenApi.Models;
// using System.Text;

// var builder = WebApplication.CreateBuilder(args);

// builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
// Console.WriteLine(">>> JWT Key: " + builder.Configuration["Jwt:Key"]);

// // ✅ Add Controllers
// builder.Services.AddControllers();
// builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

// // ✅ Add JWT Authentication
// builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddJwtBearer(options =>
//     {
//         options.TokenValidationParameters = new TokenValidationParameters
//         {
//             ValidateIssuer = true,
//             ValidateAudience = true,
//             ValidateLifetime = true,
//             ValidateIssuerSigningKey = true,
//             ValidIssuer = builder.Configuration["Jwt:Issuer"],
//             ValidAudience = builder.Configuration["Jwt:Audience"],
//             IssuerSigningKey = new SymmetricSecurityKey(
//                 Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
//         };
//     });

// // ✅ Add Authorization (bắt buộc nếu dùng [Authorize])
// builder.Services.AddAuthorization();

// // ✅ Add DbContext
// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// // ✅ Add custom services
// builder.Services.AddScoped<JwtService>();

// // ✅ Add Swagger với Bearer token
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen(options =>
// {
//     options.SwaggerDoc("v1", new OpenApiInfo { Title = "DanhSaLiem_2122110589 API", Version = "v1" });

//     options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
//     {
//         Description = "Nhập JWT token vào đây (chỉ cần token, KHÔNG cần gõ 'Bearer ' phía trước)",
//         Name = "Authorization",
//         In = ParameterLocation.Header,
//         Type = SecuritySchemeType.Http,
//         Scheme = "bearer",
//         BearerFormat = "JWT"
//     });

//     options.AddSecurityRequirement(new OpenApiSecurityRequirement
//     {
//         {
//             new OpenApiSecurityScheme
//             {
//                 Reference = new OpenApiReference
//                 {
//                     Type = ReferenceType.SecurityScheme,
//                     Id = "Bearer"
//                 },
//                 In = ParameterLocation.Header
//             },
//             new List<string>()
//         }
//     });
// });

// var app = builder.Build();

// // Swagger UI
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// // Middleware
// app.UseHttpsRedirection();
// app.UseAuthentication();
// app.UseAuthorization();

// app.MapControllers();

// app.Run();

using DanhSaLiem_2122110589.Data;
using DanhSaLiem_2122110589.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Cấu hình lấy giá trị từ appsettings.json
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
Console.WriteLine(">>> JWT Key: " + builder.Configuration["Jwt:Key"]);

// ✅ Add Controllers
builder.Services.AddControllers();
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

// ✅ Cấu hình JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

// ✅ Cấu hình Authorization (nếu sử dụng [Authorize])
builder.Services.AddAuthorization();

// ✅ Cấu hình DbContext kết nối tới cơ sở dữ liệu SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ✅ Cấu hình CORS (cho phép truy cập từ frontend React)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:3001")  // Địa chỉ của frontend React
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// ✅ Add custom services (ví dụ: dịch vụ JWT)
builder.Services.AddScoped<JwtService>();

// ✅ Cấu hình Swagger UI với JWT Authentication
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "DanhSaLiem_2122110589 API", Version = "v1" });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Nhập JWT token vào đây (chỉ cần token, KHÔNG cần gõ 'Bearer ' phía trước)",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });
});

var app = builder.Build();


// Swagger UI chỉ hoạt động trong môi trường phát triển
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Middleware
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.UseStaticFiles();
// Áp dụng CORS
app.UseCors("AllowReactApp");
app.MapControllers();

app.Run();
