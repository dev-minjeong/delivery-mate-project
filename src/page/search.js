import './main.css';

const Search = (props) => {
  const { search } = props;
  if (search) {
    document.getElementsByName('search')[0].value = search;
  }
  return (
    <div>
      <form>
        <input
          type='text'
          maxLength='20'
          className='search-input'
          name='search'
          placeholder='검색어를 입력하세요'
        ></input>
        <input type='submit' value='검색' className='search-submit'></input>
      </form>
    </div>
  );
};

export default Search;
