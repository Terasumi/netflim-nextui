"use client"

import {useState} from 'react'
import HeroSection from "@/components/HeroSection"
import {Pagination} from "@nextui-org/pagination"
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/dropdown";
import {Button} from "@nextui-org/button";
import {Select, SelectItem} from "@nextui-org/select";

//https://phim.nguonc.com/api/films/danh-sach/${slug}?page=${page}
const danhMuc = [
    {
        danhMucName: "Phim mới cập nhật",
        apiLink: "api/films/phim-moi-cap-nhat"
    },
    {
        danhMucName: "TV shows",
        apiLink: "api/films/danh-sach/tv-shows"
    },
    {
        danhMucName: "Phim bộ",
        apiLink: "api/films/danh-sach/phim-bo"
    },
    {
        danhMucName: "Phim đang chiếu",
        apiLink: "api/films/danh-sach/phim-dang-chieu"
    },
]
///api/films/the-loai/${slug}?page=${page}
const theLoai = [
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
const quocGia = [
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
const namPhatHanh = Array.from({length: 2026 - 1990 + 1}, (_, i) => ({
    namPhatHanhName: (2026 - i).toString(),
    apiLink: `api/films/nam-phat-hanh/${2026 - i}`
}));


export default function Page() {
    const [currentPage, setCurrentPage] = useState(1)
    const [currentSelected, setCurrentSelected] = useState<string>("Phim mới cập nhật")
    const [apiLink, setApiLink] = useState<string>("api/films/phim-moi-cap-nhat")

    return (
        <div className="flex flex-col gap-4">
            <strong className="block text-center text-lg">
                Lựa chọn hiện tại: <span className="font-bold text-blue-500">{currentSelected}</span>
            </strong>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Select
                    size="sm"
                    label="Thể loại"
                    className="max-w-full"
                    onSelectionChange={(value) => {
                        const item = theLoai.find((item) => item.typeName === value)
                        if (item) {
                            setApiLink(item.apiLink)
                            setCurrentSelected(item.typeName)
                            setCurrentPage(1)
                        }
                    }}
                >
                    {theLoai.map((item) => (
                        <SelectItem key={item.typeName} value={item.typeName}>
                            {item.typeName}
                        </SelectItem>
                    ))}
                </Select>

                <Select
                    size="sm"
                    label="Danh mục"
                    className="max-w-full"
                    onSelectionChange={(value) => {
                        const item = danhMuc.find((item) => item.danhMucName === value)
                        if (item) {
                            setApiLink(item.apiLink)
                            setCurrentSelected(item.danhMucName)
                            setCurrentPage(1)
                        }
                    }}
                >
                    {danhMuc.map((item) => (
                        <SelectItem key={item.danhMucName} value={item.danhMucName}>
                            {item.danhMucName}
                        </SelectItem>
                    ))}
                </Select>

                <Select
                    size="sm"
                    label="Quốc gia"
                    className="max-w-full"
                    onSelectionChange={(value) => {
                        const item = quocGia.find((item) => item.quocGiaName === value)
                        if (item) {
                            setApiLink(item.apiLink)
                            setCurrentSelected(item.quocGiaName)
                            setCurrentPage(1)
                        }
                    }}
                >
                    {quocGia.map((item) => (
                        <SelectItem key={item.quocGiaName} value={item.quocGiaName}>
                            {item.quocGiaName}
                        </SelectItem>
                    ))}
                </Select>

                <Select
                    size="sm"
                    label="Năm phát hành"
                    className="max-w-full"
                    onSelectionChange={(value) => {
                        const item = namPhatHanh.find((item) => item.namPhatHanhName === value)
                        if (item) {
                            setApiLink(item.apiLink)
                            setCurrentSelected(item.namPhatHanhName)
                            setCurrentPage(1)
                        }
                    }}
                >
                    {namPhatHanh.map((item) => (
                        <SelectItem key={item.namPhatHanhName} value={item.namPhatHanhName}>
                            {item.namPhatHanhName}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className={"flex flex-col items-center"}>
                <HeroSection currentPage={currentPage} apiLink={apiLink}/>
                <Pagination
                    page={currentPage}
                    total={100}
                    onChange={(newPage) => {
                        setCurrentPage(newPage)
                    }}
                />
            </div>
        </div>
    )
}