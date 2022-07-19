import { useEffect } from "react";
import BookTable from "./BookTable";
import BookCategory from "./BookCategory";
import Container from "../../components/ui/Container";
import { useTokenContext } from "../../context/tokenContext";
import { useBooksContext } from "../../context/booksContext";
import { getAllBooksReq } from "../../api/books";

const BooksPage = () => {
  const { token } = useTokenContext();
  const { setInitialBooks, setBooksForUsage } = useBooksContext();

  useEffect(() => {
    (async function getBooks() {
      const res = await getAllBooksReq(token);
      if (res.status === 200) {
        setInitialBooks(res.data);
        setBooksForUsage(res.data);
      }
    })();
    // eslint-disable-next-line
  }, []);
  return (
    <Container>
      <BookTable></BookTable>
      <BookCategory></BookCategory>
    </Container>
  );
};

export default BooksPage;
