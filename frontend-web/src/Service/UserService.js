import axios from 'axios';

const UserService = {
  login: async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5001/api/user/login', { email, password });
      return response.data;  // Trả về dữ liệu nhận được từ API (bao gồm token)
    } catch (error) {
      throw error;  // Ném lỗi nếu có sự cố trong khi gửi yêu cầu
    }
  },

  // Lấy dữ liệu bảo vệ yêu cầu sử dụng token
  getProtectedData: async () => {
    const token = JSON.parse(localStorage.getItem('userData'))?.token;
    
    if (!token) {
      throw new Error('Bạn cần phải đăng nhập để truy cập dữ liệu này');
    }

    try {
      const response = await axios.get('http://localhost:5001/api/protected-data', {
        headers: {
          Authorization: `Bearer ${token}`,  // Thêm token vào header
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default UserService;
