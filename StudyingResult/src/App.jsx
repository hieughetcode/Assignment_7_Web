import { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import ResultsDisplay from './components/ResultsDisplay';
import StatusMessage from './components/StatusMessage';

//Hàm giả lập độ trễ mạng
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default function App() {
  //khởi tạo các useState: quản lý, result, isloading, status ,error
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [resultsData, setResultsData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  
  useEffect(() => {
    // Nếu searchQuery rỗng thì return luôn
    if (!searchQuery) {
      return;
    }

    const fetchData = async () => {
      // Đặt lại state về trạng thái bắt đầu tra cứu
      setIsLoading(true);
      setError(null);
      setStatus(null);
      setResultsData(null);

      try {
        //Đặt delay 3s để đảm bảo mọi tra cứu mất 3s
        await wait(3000);
        //Giả lập lỗi 50%
        if (Math.random() < 0.5) {
          throw new Error('Không lấy được thông tin, vui lòng thử lại!');
        }
        //Kết thúc phần giả lập lỗi

        //Fetch dữ liệu bằng Promise.all
        const [svRes, hpRes, kqRes] = await Promise.all([
          fetch('./sinhvien.json').then(res => res.json()),
          fetch('./hocphan.json').then(res => res.json()),
          fetch('./ketqua.json').then(res => res.json())
        ]);

        //Xử lý dữ liệu
        const student = svRes.find(s => s.sid === searchQuery);
        if (!student) {
          //Lỗi thật nếu file JSON không có 
          throw new Error(`Không tìm thấy sinh viên có MSSV: ${searchQuery}`);
        }

        //Lọc và map kết quả
        const studentResults = kqRes.filter(r => r.sid === searchQuery);
        const detailedResults = studentResults.map(result => {
          const course = hpRes.find(c => c.cid === result.cid);
          return {
            ...result,
            courseName: course ? course.name : 'N/A',
            credits: course ? course.credits : 'N/A'
          };
        });

        //Chuẩn bị dữ liệu
        const dataToDisplay = {
          student: student,
          results: detailedResults
        };

        // Cập nhật state để React tự động render
        setResultsData(dataToDisplay);
        setStatus('Tải dữ liệu thành công!');

      } catch (error) {
        console.error('Lỗi khi tra cứu:', error);
        setError(error.message);

      } finally {
        setIsLoading(false);
      }
    };

    // Gọi hàm fetchData (vẫn ở bên trong useEffect)
    fetchData();

  }, [searchQuery]); // useEffect sẽ chạy lại khi `searchQuery` thay đổi

  const handleSearch = (sidFromForm) => {
    if (!sidFromForm) {
      setError('Vui lòng nhập Mã số sinh viên!');
      return;
    }
    // Cập nhật state
    setSearchQuery(sidFromForm);
  };

  //Render giao diện
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Tra Cứu Kết Quả Học Tập Sinh Viên
        </h1>

        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        <StatusMessage
          isLoading={isLoading}
          error={error}
          status={status}
        />

        {resultsData && !isLoading && !error && (
          <ResultsDisplay data={resultsData} />
        )}

        {!resultsData && !isLoading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-3 text-gray-800 font-semibold">Mã HP</th>
                  <th className="border px-4 py-3 text-gray-800 font-semibold">Tên học phần</th>
                  <th className="border px-4 py-3 text-gray-800 font-semibold">Số TC</th>
                  <th className="border px-4 py-3 text-gray-800 font-semibold">Học kỳ</th>
                  <th className="border px-4 py-3 text-gray-800 font-semibold">Điểm số</th>
                  <th className="border px-4 py-3 text-gray-800 font-semibold">Điểm chữ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="6" className="border px-4 py-3 text-center text-gray-500">
                    Chưa có dữ liệu. Vui lòng nhập MSSV và tra cứu.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}