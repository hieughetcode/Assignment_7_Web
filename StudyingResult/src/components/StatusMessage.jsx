//Hiển thị trạng thái tra cứu: Đang tải, Lỗi, Thành công
export default function StatusMessage({ isLoading, error, status }) {
  let message = '';
  let colorClass = '';

  if (isLoading) {
    message = 'Đang tải dữ liệu...';
    colorClass = 'text-blue-600';
  }
  else if (error) {
    message = error;
    colorClass = 'text-red-600 font-bold';
  }
  else if (status) {
    message = status;
    if (status.includes('cache')) {
      colorClass = 'text-purple-600 italic';
    }
    else {
      colorClass = 'text-green-600';
    }
  }

  // Nếu không có tin nhắn gì, render rỗng
  if (!message) {
    return null;
  }

  // Trả về hiển thị đoạn thông báo tra cứu
  return (
    <div id="status-message" className="text-center mb-6">
      <p className={colorClass}>{message}</p>
    </div>
  );
}