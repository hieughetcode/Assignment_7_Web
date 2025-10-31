//Hiển thị kết quả học tập sinh viên

//Hàm chuyển điểm số sang điểm chữ
function convertScoreToLetter(score) {
  if (score >= 9.5) return 'A+';
  if (score >= 8.5) return 'A';
  if (score >= 8.0) return 'B+';
  if (score >= 7.0) return 'B';
  if (score >= 6.5) return 'C+';
  if (score >= 6.0) return 'C';
  if (score >= 5.0) return 'D+';
  if (score >= 4.0) return 'D';
  return 'F';
}

export default function ResultsDisplay({ data }) {
  const { student, results } = data;
  //Trả về thông tin và bảng điểm kì 2024.2 của sinh viên
  return (
    <>
      {/*Thông tin sinh viên*/}
      <div id="student-info" className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Thông tin sinh viên</h2>
        <div className="grid grid-cols-2 gap-x-4 mt-2">
          <p><strong>Họ tên:</strong> {student.name}</p>
          <p><strong>MSSV:</strong> {student.sid}</p>
          <p><strong>Ngày sinh:</strong> {student.dob}</p>
        </div>
      </div>

      {/*Bảng điểm kì 2024.2 của sinh viên*/}
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
          
          {/* Đây là logic của hàm displayResults */}
          <tbody id="results-table-body">
            {results.length === 0 ? (
              <tr>
                <td colSpan="6" className="border px-4 py-3 text-center text-gray-500">
                  Sinh viên này chưa có điểm.
                </td>
              </tr>
            ) : (
              //Dùng .map() để render
              results.map(item => {
                const score = parseFloat(item.score);
                const letterGrade = convertScoreToLetter(score);
                
                // Bắt buộc phải có `key` duy nhất
                // Chúng ta dùng cid + term để đảm bảo là duy nhất
                return (
                  <tr key={item.cid + item.term} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{item.cid}</td>
                    <td className="border px-4 py-2">{item.courseName}</td>
                    <td className="border px-4 py-2 text-center">{item.credits}</td>
                    <td className="border px-4 py-2 text-center">{item.term}</td>
                    <td className="border px-4 py-2 text-center">{score.toFixed(1)}</td>
                    <td className="border px-4 py-2 text-center font-semibold">{letterGrade}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}