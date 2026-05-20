import { useState, useMemo } from "react";
import Container from "../components/ui/Container";
import { useGetReliefGoodsQuery } from "../redux/api/api";
import SingleCard, { TPackage } from "./reliefGoodsCardItem/SingleCard";

const AllReliefGoods = () => {
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const { data: reliefGoods, isLoading } = useGetReliefGoodsQuery(undefined);

  // Categories Logic
  const categories = useMemo(() => {
    if (!reliefGoods?.data) return ["All"];
    const cats = (reliefGoods.data as TPackage[]).map((item) => item.category);
    return ["All", ...Array.from(new Set(cats))];
  }, [reliefGoods]);

  // Filter Logic
  const filteredGoods = useMemo(() => {
    if (!reliefGoods?.data) return [];
    if (filterCategory === "All") return reliefGoods.data;
    return (reliefGoods.data as TPackage[]).filter(
      (item) => item.category === filterCategory,
    );
  }, [reliefGoods, filterCategory]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredGoods.length / itemsPerPage);
  const paginatedGoods = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredGoods.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredGoods, currentPage]);

  if (isLoading)
    return (
      <div
        className="min-h-screen flex items-center justify-center font-black text-2xl"
        style={{ color: "#FDA4AF" }}
      >
        LOADING RELIEF NODES...
      </div>
    );

  return (
    <div className="min-h-screen  px-4">
      <Container>
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-extrabold from-text-[#FDA4AF] text-slate-900 tracking-tighter">
            Relief Supplies
          </h1>
          <div
            className="w-20 h-1.5 mx-auto rounded-full"
            style={{ backgroundColor: "#FDA4AF" }}
          ></div>
        </div>

        {/* Filter Box */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => {
                setFilterCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                filterCategory === cat
                  ? "text-white shadow-lg"
                  : "bg-white text-slate-600 hover:shadow-md"
              }`}
              style={{
                backgroundColor: filterCategory === cat ? "#FDA4AF" : "",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {paginatedGoods.map((item: TPackage) => (
            <div
              key={item._id}
              className="group hover:-translate-y-2 transition-transform duration-500"
            >
              <SingleCard {...item} />
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16 mb-16">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-4 py-2 rounded-lg bg-white border border-slate-200 disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-lg font-bold ${currentPage === i + 1 ? "text-white" : "bg-white text-slate-600"}`}
                style={{
                  backgroundColor: currentPage === i + 1 ? "#FDA4AF" : "",
                }}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 rounded-lg bg-white border border-slate-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default AllReliefGoods;
