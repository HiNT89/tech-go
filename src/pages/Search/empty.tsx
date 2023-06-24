function Empty() {
  return (
    <main className="w-full px-4 h-96 flex justify-center items-center flex-col">
      <div className="flex flex-col items-center gap-3 py-4">
        <h1 className="font-bold text-3xl capitalize">Tìm kiếm</h1>
        <div className="w-28 h-2 bg-black"></div>
        <b>Không tìm thấy nội dung bạn yêu cầu</b>
      </div>
      <p className="py-3 text-sm font-normal text-center">
        Không tìm thấy . Vui lòng kiểm tra chính tả, sử dụng các từ tổng quát
        hơn và thử lại!
      </p>
    </main>
  );
}

export default Empty;
