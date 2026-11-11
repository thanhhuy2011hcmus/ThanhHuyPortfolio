import { useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    // Lấy dữ liệu từ form
    const formData = new FormData(e.currentTarget);
    
    // TODO: Thay YOUR_ACCESS_KEY bằng key bạn nhận được từ Web3Forms
    formData.append("access_key", "a22b2d32-148b-4bcc-b16b-15e1683689ea");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        e.currentTarget.reset(); // Xóa trắng form sau khi gửi thành công
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Lỗi khi gửi email:", error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Liên hệ với mình</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email của bạn
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="example@gmail.com"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Tiêu đề
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Bạn muốn trao đổi về..."
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Nội dung
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            placeholder="Nhập nội dung tin nhắn..."
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Đang gửi...' : 'Gửi tin nhắn'}
        </button>

        {/* Hiển thị thông báo trạng thái */}
        {status === 'success' && (
          <p className="text-green-600 text-sm text-center font-medium mt-2">
            Gửi thành công! Mình sẽ phản hồi sớm nhất có thể.
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-600 text-sm text-center font-medium mt-2">
            Có lỗi xảy ra. Vui lòng thử lại sau.
          </p>
        )}
      </form>
    </div>
  );
}
