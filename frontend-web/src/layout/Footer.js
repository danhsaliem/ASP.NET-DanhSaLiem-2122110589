import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Thông tin công ty */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Cửa hàng quà lưu niệm</h3>
          <p>Đường Lã Xuân Oai, TP. Hồ Chí Minh</p>
          <p>Hotline: 0989 102 1030</p>
          <p>Email: souvenirs.store@gmail.com</p>
          <a href="http://localhost:3000/" className="hover:text-yellow-300">souvenirsstore.com.vn</a>
        </div>

        {/* Truy cập nhanh */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Truy cập nhanh</h4>
          <ul>
            <li><a href="/home" className="hover:text-yellow-300">Trang chủ</a></li>
            <li><a href="/about" className="hover:text-yellow-300">Giới thiệu</a></li>
            <li><a href="/blog" className="hover:text-yellow-300">Tin tức</a></li>
            <li><a href="/contact" className="hover:text-yellow-300">Liên hệ</a></li>
          </ul>
        </div>

        {/* Danh mục sản phẩm */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Danh mục sản phẩm</h4>
          <ul>
            <li><a href="#" className="hover:text-yellow-300">Quà tặng lưu niệm</a></li>
            <li><a href="#" className="hover:text-yellow-300">Đồ thủ công mỹ nghệ</a></li>
            <li><a href="#" className="hover:text-yellow-300">Phụ kiện trang trí</a></li>
          </ul>
        </div>

        {/* Mạng xã hội */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Theo dõi chúng tôi</h4>
          <ul>
            <li><a href="#" className="hover:text-yellow-300">Facebook</a></li>
            <li><a href="#" className="hover:text-yellow-300">YouTube</a></li>
            <li><a href="#" className="hover:text-yellow-300">Twitter</a></li>
            <li><a href="#" className="hover:text-yellow-300">Instagram</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white-700 mt-8 pt-4 text-center">
        <p>© 2025 souvenirsstore.com.vn. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
