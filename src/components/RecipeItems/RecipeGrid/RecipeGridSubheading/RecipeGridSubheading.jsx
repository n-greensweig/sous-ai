import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
function RecipeGridSubheading({ listName, numOfRecipes, searchQuery, setSearchQuery }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
            <div style={{ display: 'flex', flexDirection: 'column', }}>
                <h2 style={{ marginLeft: 'inherit', color: '#222', margin: 0 }}>{listName}</h2>
                {numOfRecipes > 0 ? <p style={{ marginTop: 0, color: '#717171' }}>{numOfRecipes} {numOfRecipes === 1 ? 'recipe' : 'recipes'}</p> :
                    <p style={{ marginTop: 0, color: '#717171' }}>No recipes yet</p>}
            </div>
            <div className="search__input" style={{
                display: 'flex', flexDirection: 'row',
                alignItems: 'center', position: 'absolute', right: '2%',
            }}>
                <SearchIcon className='icon--black search' />
                <input
                    type="text"
                    placeholder="Search your saved recipes"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                />
                {searchQuery ? <CancelIcon onClick={() => setSearchQuery('')} className='icon--gray' /> : null}
            </div>
        </div>
    )
}

export default RecipeGridSubheading;