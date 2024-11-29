"use client"

import {useRef, useState} from 'react'
import HeroSection from "@/components/HeroSection"
import {Pagination} from "@nextui-org/pagination"
import {Select, SelectItem} from "@nextui-org/select";
import {danhMuc, namPhatHanh, quocGia, theLoai} from "@/data/selects";
import CarouselSection from '@/components/CarouselSection';


export default function Page() {
    const MovieRef = useRef(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentSelected, setCurrentSelected] = useState<string>("Phim đang chiếu")
    const [apiLink, setApiLink] = useState<string>("api/films/danh-sach/phim-dang-chieu")


    //MovieRef function
    const handleScroll = () => {
        //scroll to MovieRef
        if (MovieRef.current) {
            setTimeout(() => {
                // @ts-ignore
                MovieRef.current.scrollIntoView({behavior: 'smooth', block: 'start'})
            }, 100) // Small delay to ensure the video has rendered
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className={"h-fit"}>
                <strong className="block  text-lg">
                    <span className="font-bold text-2xl text-blue-500">Phim mới cập nhật</span>
                </strong>
                <CarouselSection/>
            </div>

            <strong className="block text-center text-lg">
                Lựa chọn hiện tại: <span className="font-bold text-blue-500">{currentSelected}</span>
            </strong>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Select
                    size="sm"
                    label="Thể loại"
                    className="max-w-full"
                    onSelectionChange={(value) => {
                        const item = theLoai.find((item) => item.typeName === value.currentKey)
                        if (item) {
                            setApiLink(item.apiLink)
                            setCurrentSelected(item.typeName)
                            setCurrentPage(1)
                            handleScroll()
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
                        const item = danhMuc.find((item) => item.danhMucName === value.currentKey)
                        if (item) {
                            setApiLink(item.apiLink)
                            setCurrentSelected(item.danhMucName)
                            setCurrentPage(1)
                            handleScroll()

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
                        const item = quocGia.find((item) => item.quocGiaName === value.currentKey)
                        if (item) {
                            setApiLink(item.apiLink)
                            setCurrentSelected(item.quocGiaName)
                            setCurrentPage(1)
                            handleScroll()

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
                        const item = namPhatHanh.find((item) => item.namPhatHanhName === value.currentKey)
                        if (item) {
                            setApiLink(item.apiLink)
                            setCurrentSelected(item.namPhatHanhName)
                            setCurrentPage(1)
                            handleScroll()

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
            <div className={"flex flex-col items-center"} ref={MovieRef}>
                <HeroSection currentPage={currentPage} apiLink={apiLink}/>
                <Pagination
                    page={currentPage}
                    total={100}
                    onChange={(newPage) => {
                        setCurrentPage(newPage)
                        handleScroll()
                    }}
                />
            </div>
        </div>
    )
}