using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DanhSaLiem_2122110589.Model;
using DanhSaLiem_2122110589.Data;

namespace DanhSaLiem_2122110589.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        private readonly AppDbContext pro;

        public OrderDetailController(AppDbContext context)
        {
            pro = context;
        }

        // GET: api/OrderDetail
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDetail>>> GetOrderDetails()
        {
            return await pro.OrderDetails.ToListAsync();
        }

        // GET: api/OrderDetail/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDetail>> GetOrderDetail(int id)
        {
            if (id <= 0)
            {
                return BadRequest("ID không hợp lệ");
            }

            var orderDetail = await pro.OrderDetails
                .FirstOrDefaultAsync(od => od.Id == id);

            if (orderDetail == null)
            {
                return NotFound();
            }

            return orderDetail;
        }


        [HttpPost]
        public async Task<ActionResult<OrderDetail>> PostOrderDetail(OrderDetail orderDetail)
        {
            var order = await pro.Orders.FindAsync(orderDetail.OrderId);
            var product = await pro.Products.FindAsync(orderDetail.ProductId);

            if (order == null || product == null)
            {
                return BadRequest("Đơn hàng hoặc sản phẩm không tồn tại.");
            }

            if (product.Quantity < orderDetail.Quantity)
            {
                return BadRequest("Không đủ hàng trong kho.");
            }

            product.Quantity -= orderDetail.Quantity;
            pro.Entry(product).State = EntityState.Modified;

            pro.OrderDetails.Add(orderDetail);
            await pro.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrderDetail), new { id = orderDetail.Id }, orderDetail);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderDetail(int id, OrderDetail orderDetail)
        {
            if (id != orderDetail.Id)
            {
                return BadRequest("ID không khớp.");
            }

            var order = await pro.Orders.FindAsync(orderDetail.OrderId);
            var product = await pro.Products.FindAsync(orderDetail.ProductId);

            if (order == null || product == null)
            {
                return BadRequest("Đơn hàng hoặc sản phẩm không tồn tại.");
            }

            pro.Entry(orderDetail).State = EntityState.Modified;

            try
            {
                await pro.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderDetail(int id)
        {
            var orderDetail = await pro.OrderDetails.FindAsync(id);
            if (orderDetail == null)
            {
                return NotFound();
            }

            pro.OrderDetails.Remove(orderDetail);
            await pro.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderDetailExists(int id)
        {
            return pro.OrderDetails.Any(e => e.Id == id);
        }


        [HttpGet("order/{orderId}")]
        public async Task<IActionResult> GetByOrderId(int orderId)
        {
            var orderDetails = await pro.OrderDetails
                .Where(od => od.OrderId == orderId)
                .ToListAsync();

            if (orderDetails == null || !orderDetails.Any())
            {
                return NotFound("Không có chi tiết đơn hàng.");
            }

            return Ok(orderDetails);
        }
    }
}
