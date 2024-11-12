//https://phim.nguonc.com/api/films/danh-sach/${slug}?page=${page}
export const danhMuc = [
    {
        danhMucName: "Phim mới cập nhật",
        apiLink: "api/phim-moi-cap-nhat"
    },
    {
        danhMucName: "TV shows",
        apiLink: "api/danh-sach/tv-shows"
    },
    {
        danhMucName: "Phim bộ",
        apiLink: "api/danh-sach/phim-bo"
    },
    {
        danhMucName: "Phim đang chiếu",
        apiLink: "api/danh-sach/phim-dang-chieu"
    },
]
///api/films/the-loai/${slug}?page=${page}
export const theLoai = [
    {
        typeName: "Hành động",
        apiLink: "api/films/the-loai/hanh-dong"
    },
    {
        typeName: "Phiêu lưu",
        apiLink: "api/films/the-loai/phieu-luu"
    },
    {
        typeName: "Hoạt hình",
        apiLink: "api/films/the-loai/hoat-hinh"
    },
    {
        typeName: "Phim hài",
        apiLink: "api/films/the-loai/phim-hai"
    },
    {
        typeName: "Hình sự",
        apiLink: "api/films/the-loai/hinh-su"
    },
    {
        typeName: "Tài liệu",
        apiLink: "api/films/the-loai/tai-lieu"
    },
    {
        typeName: "Chính kịch",
        apiLink: "api/films/the-loai/chinh-kich"
    },
    {
        typeName: "Gia đình",
        apiLink: "api/films/the-loai/gia-dinh"
    },
    {
        typeName: "Giả tưởng",
        apiLink: "api/films/the-loai/gia-tuong"
    },
    {
        typeName: "Lịch sử",
        apiLink: "api/films/the-loai/lich-su"
    },
    {
        typeName: "Kinh dị",
        apiLink: "api/films/the-loai/kinh-di"
    },
    {
        typeName: "Phim nhạc",
        apiLink: "api/films/the-loai/phim-nhac"
    },
    {
        typeName: "Bí ẩn",
        apiLink: "api/films/the-loai/bi-an"
    },
    {
        typeName: "Lãng mạng",
        apiLink: "api/films/the-loai/lang-man"
    },
    {
        typeName: "Khoa học viễn tưởng",
        apiLink: "api/films/the-loai/khoa-hoc-vien-tuong"
    },
    {
        typeName: "Gay cấn",
        apiLink: "api/films/the-loai/gay-can"
    },
    {
        typeName: "Chiến tranh",
        apiLink: "api/films/the-loai/chien-tranh"
    },
    {
        typeName: "Miền Tây",
        apiLink: "api/films/the-loai/mien-tay"
    },
    {
        typeName: "Cổ trang",
        apiLink: "api/films/the-loai/co-trang"
    },
    {
        typeName: "Tâm lý",
        apiLink: "api/films/the-loai/tam-ly"
    },
    {
        typeName: "Phim 18+",
        apiLink: "api/films/the-loai/phim-18"
    },
    {
        typeName: "Tình cảm",
        apiLink: "api/films/the-loai/tinh-cam"
    },
]

//https://phim.nguonc.com/api/films/quoc-gia/${slug}?page=${page}
export const quocGia = [
    {
        quocGiaName: "Âu Mỹ",
        apiLink: "api/films/quoc-gia/au-my"
    },
    {
        quocGiaName: "Anh",
        apiLink: "api/films/quoc-gia/anh"
    },
    {
        quocGiaName: "Trung Quốc",
        apiLink: "api/films/quoc-gia/trung-quoc"
    },
    {
        quocGiaName: "Indonesia",
        apiLink: "api/films/quoc-gia/indonesia"
    },
    {
        quocGiaName: "Việt Nam",
        apiLink: "api/films/quoc-gia/viet-nam"
    },
    {
        quocGiaName: "Pháp",
        apiLink: "api/films/quoc-gia/phap"
    },
    {
        quocGiaName: "Hồng Kông",
        apiLink: "api/films/quoc-gia/hong-kong"
    },
    {
        quocGiaName: "Hàn Quốc",
        apiLink: "api/films/quoc-gia/han-quoc"
    },
    {
        quocGiaName: "Nhật Bản",
        apiLink: "api/films/quoc-gia/nhat-ban"
    },
    {
        quocGiaName: "Thái Lan",
        apiLink: "api/films/quoc-gia/thai-lan"
    },
    {
        quocGiaName: "Đài Loan",
        apiLink: "api/films/quoc-gia/dai-loan"
    },
    {
        quocGiaName: "Nga",
        apiLink: "api/films/quoc-gia/nga"
    },
    {
        quocGiaName: "Hà Lan",
        apiLink: "api/films/quoc-gia/ha-lan"
    },
    {
        quocGiaName: "Philippines",
        apiLink: "api/films/quoc-gia/philippines"
    },
    {
        quocGiaName: "Ấn Độ",
        apiLink: "api/films/quoc-gia/an-do"
    },
    {
        quocGiaName: "Quốc gia khác",
        apiLink: "api/films/quoc-gia/quoc-gia-khac"
    }
];

//https://phim.nguonc.com/api/films/nam-phat-hanh/${slug}?page=${page}
export const namPhatHanh = Array.from({length: 2026 - 1990 + 1}, (_, i) => ({
    namPhatHanhName: (2026 - i).toString(),
    apiLink: `api/films/nam-phat-hanh/${2026 - i}`
}));