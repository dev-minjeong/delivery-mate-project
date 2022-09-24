import styled from 'styled-components';

const Search = ({ search }) => {
  return (
    <SearchBox>
      <form>
        <input
          type='text'
          maxLength='20'
          className='search-input'
          name='search'
          placeholder='검색어를 입력하세요'
          defaultValue={search}
        ></input>
        <SearchSubmit
          type='submit'
          value=''
          className='search-submit'
        ></SearchSubmit>
      </form>
    </SearchBox>
  );
};

const SearchBox = styled.div`
  background-color: white;
  padding: 10px;
  border: 0;
  border-radius: 10px;
  width: 70%;
  min-width: 200px;
  height: 38px;
  margin-right: 3vw;
  form {
    display: flex;
    justify-content: space-between;
  }
`;
const SearchSubmit = styled.input`
  width: 17px;
  height: 17px;
  cursor: pointer;
  background-color: inherit;
  background-image: url('https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2012/png/iconmonstr-magnifier-5.png&r=0&g=0&b=0');
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

export default Search;
