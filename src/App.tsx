import GradeBarChart from './components/GradeBarChart/GradeBarChart';
import GradeTable from './components/GradeTable/GradeTable';
import GradeTableFilter from './components/GradeTableFilter/GradeTableFilter';
import { setFilters } from './features/loanData/loanDataSlice';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import useFetchData from './hooks/useFetchData';

export default function App() {
  const { data, filteredData, loading, error, filters } = useAppSelector(
    (state) => state.loanData
  );

  const dispatch = useAppDispatch();
  useFetchData(dispatch);

  return (
    <main className="flex flex-col items-center min-h-screen pt-20 text-white bg-gray-900">
      <h1 className="mb-10 text-3xl font-bold tracking-tight">
        dv01 Loan Analysis
      </h1>

      {error && (
        <p className="py-10 text-2xl font-bold tracking-tight text-center">
          There has been an error
        </p>
      )}
      {loading ? (
        <p className="py-10 text-2xl font-bold tracking-tight text-center">
          Loading Data
        </p>
      ) : (
        <>
          <div className="space-y-6">
            <GradeBarChart chartData={filteredData} />
            <GradeTable loanData={filteredData} />
            <GradeTableFilter
              filters={filters}
              updateFilters={(updatedFilters) => {
                dispatch(setFilters(updatedFilters));
              }}
              loanData={data}
            />
          </div>
        </>
      )}
    </main>
  );
}
