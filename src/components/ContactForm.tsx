import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Lưu form ngay, vì sau await thì e.currentTarget sẽ thành null
    const form = e.currentTarget;

    setStatus('loading');
    setErrorMsg('');

    const formData = new FormData(form);
    formData.append('access_key', 'a22b2d32-148b-4bcc-b16b-15e1683689ea');
    formData.append(
      'subject',
      `Tin nhắn mới từ ${formData.get('name')?.toString() || 'người lạ'}`
    );

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
        form.reset();
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
    'w-full px-5 py-4 bg-[#1a1a1a] border border-[#2a2a2a] text-gray-100 rounded-2xl outline-none transition-all placeholder:text-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500';

  return (
    <section className="min-h-screen bg-[#111111] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-green-950/60">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-500"
            aria-hidden="true"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>

        <h2 className="text-4xl font-extrabold text-white tracking-tight">Liên hệ</h2>
        <p className="mt-5 mb-10 font-mono text-sm leading-7 text-gray-400">
          Ngày sinh: 20/11/2007. Hãy liên hệ với tôi để cùng trao đổi về dữ liệu và công nghệ.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <input
            type="text"
            name="name"
            required
            placeholder="Họ và tên"
            aria-label="Họ và tên"
            className={inputClass}
          />

          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            aria-label="Email"
            className={inputClass}
          />

          <textarea
            name="message"
            required
            rows={6}
            placeholder="Lời nhắn"
            aria-label="Lời nhắn"
            className={`${inputClass} resize-y`}
          />

          <button
            type="submit"
            disabled={status === 'loading'}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 px-4 py-4 font-mono font-bold text-black shadow-[0_0_24px_rgba(34,197,94,0.35)] transition-all duration-200 hover:bg-green-400 hover:shadow-[0_0_32px_rgba(34,197,94,0.5)] disabled:cursor-not-allowed disabled:bg-green-800 disabled:text-green-950 disabled:shadow-none"
          >
            {status === 'loading' ? (
              'Đang gửi...'
            ) : (
              <>
                Gửi lời nhắn
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </>
            )}
          </button>

          {status === 'success' && (
            <div
              role="status"
              className="rounded-2xl border border-green-500/40 bg-green-500/10 p-4 text-center text-sm font-bold text-green-400"
            >
              🎉 Gửi thành công! Mình đã nhận được tin nhắn.
            </div>
          )}

          {status === 'error' && (
            <div
              role="alert"
              className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-center text-sm font-bold text-red-400"
            >
              Có lỗi xảy ra: {errorMsg}
            </div>
          )}
        </form>

        {/* GitHub */}
        <a
          href="https://github.com/thanhhuy2011hcmus"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 font-mono text-sm text-gray-400 transition-colors hover:text-green-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
          github.com/thanhhuy2011hcmus
        </a>
      </div>
    </section>
  );
}
