Assignment 7
1, Component nào quản lý state?
Ans:
    Component 'App' quản lý các state chính của ứng dụng: 'searchQuery', 'isLoading', 'error', 'status' và 'resultsData,
    Component 'SearchForm' có state riêng [sid, setSid] quản lý nhập liệu trong Form
2, Khi nào useEffect được kích hoạt?
Ans:
    useEffect trong component 'App' được thiết lập theo dõi state 'searchQuery'. Nó tự động được kích hoạt và thực thi fetchData()
    khi state 'searchQuery' thay đổi. State chỉ thay đổi khi ta nhấn nút "Tra cứu" (hàm handleSearch() được gọi tới)