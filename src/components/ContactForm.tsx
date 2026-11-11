import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Lưu form lại NGAY, vì sau await thì e.currentTarget sẽ thành null
    const form = e.currentTarget;

    setStatus('loading');
    setErrorMsg('');

    const formData = new FormData(form);
    formData.append('access_key', 'a22b2d32-148b-4bcc-b16b-15e1683689ea');

    const payload: Record<string, string> = {};
    formData.forEach((value, key) => {
      payload[key] = value.toString();
    });

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        form.reset(); // dùng biến đã lưu, không dùng e.currentTarget
      } else {
        console.error('Lỗi từ Web3Forms:', data);
        setErrorMsg(data.message || 'Không gửi được tin nhắn.');
        setStatus('error');
      }
    } catch (error) {
      console.error('Lỗi mạng:', error);
      setErrorMsg('Không kết nối được. Hãy kiểm tra mạng rồi thử lại.');
      setStatus('error');
    }
  };

  const inputClass =
    'w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400 font-medium';

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Liên hệ với mình
        </h2>
        <p className="text-gray-500 mt-2 font-medium">
          Hãy để lại lời nhắn, mình sẽ phản hồi sớm nhất.
        </p>
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
            className={inputClass}
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
            className={inputClass}
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
            className={`${inputClass} resize-none`}
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
              Có lỗi xảy ra: {errorMsg}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
