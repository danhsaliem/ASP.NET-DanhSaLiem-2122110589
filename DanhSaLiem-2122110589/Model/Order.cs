using System.Collections.Generic;  // Thêm using cho ICollection
using System;  // Thêm using cho DateTime nếu cần
using DanhSaLiem_2122110589.Model;

namespace DanhSaLiem_2122110589.Model
{
    public class Order
    {
        public int Id { get; set; }  

        public int UserId { get; set; }  

        public string Name { get; set; }  

        public string Phone { get; set; }  

        public string Email { get; set; }  

        public string Address { get; set; }  

        public virtual ICollection<OrderDetail>? OrderDetails { get; set; } 
    }
}