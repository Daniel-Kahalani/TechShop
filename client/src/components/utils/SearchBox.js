import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from '../../styles/components/SearchBoxStyles';

export default function SearchBox() {

    const classes = useStyles()
    const history = useHistory()
    const [keyword, setKeyword] = useState('');

    const handleSearch = (e) => {
        if (e.keyCode === 13) {
            if (keyword.trim())
                history.push(`/search/${keyword}`)
            else
                history.push('/')
            setKeyword('')
        }
    }

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search…"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleSearch}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
        </div>
    )
}
