import { useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    
    // Bạn giữ nguyên dòng accessKey đã điền đúng của bạn
    const accessKey = "a22b2d32-148b-4bcc-b16b-15e1683689ea"; 
    
    formData.append("access_key", accessKey);

    // Bổ sung bước này: Chuyển đổi FormData sang định dạng chuẩn JSON
    const object = Object.fromEntries(formData.entries());
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: json,
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        e.currentTarget.reset(); 
      } else {
        setStatus('error');
        // In chi tiết lỗi ra console để dễ gỡ lỗi
        console.error("Lỗi từ Web3Forms:", data); 
      }
    } catch (error) {
      console.error("Lỗi mạng:", error);
      setStatus('error');
    }
  };
    
    formData.append("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        e.currentTarget.reset(); 
      } else {
        setStatus('error');
        console.error("Lỗi từ Web3Forms:", data);
      }
    } catch (error) {
      console.error("Lỗi mạng:", error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Liên hệ với mình</h2>
        <p className="text-gray-500 mt-2 font-medium">Hãy để lại lời nhắn, mình sẽ phản hồi sớm nhất.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-2">
            Email của bạn
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            // text-gray-900 và bg-gray-50 giúp chữ nổi bật, dễ đọc, không bị trùng màu nền
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400 font-medium"
            placeholder="example@gmail.com"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-bold text-gray-800 mb-2">
            Tiêu đề
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400 font-medium"
            placeholder="Bạn muốn trao đổi về..."
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-bold text-gray-800 mb-2">
            Nội dung
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none transition-all placeholder:text-gray-400 font-medium"
            placeholder="Nhập nội dung tin nhắn..."
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-blue-600 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed disabled:transform-none mt-2"
        >
          {status === 'loading' ? 'Đang xử lý...' : 'Gửi tin nhắn'}
        </button>

        {status === 'success' && (
          <div className="p-4 bg-green-50 rounded-xl border border-green-200 mt-4">
            <p className="text-green-700 text-sm text-center font-bold">
              🎉 Gửi thành công! Mình đã nhận được tin nhắn.
            </p>
          </div>
        )}
        {status === 'error' && (
          <div className="p-4 bg-red-50 rounded-xl border border-red-200 mt-4">
            <p className="text-red-700 text-sm text-center font-bold">
              Có lỗi xảy ra. Hãy chắc chắn bạn đã nhập đúng email và cấu hình Access Key.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
