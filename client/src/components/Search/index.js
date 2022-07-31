import React from 'react';
import Typography from "@material-ui/core/Typography";
import { AppBar } from '@material-ui/core';
import history from '../Navigation/history'
import Link from '@material-ui/core/Link'

export default function Search(){
    return(
        <div  style={{ margin: '50px' }}>
        <AppBar position="static">

        <Link
            color = 'inherit'
            style={{cursor:"pointer"}}
            onClick={() => history.push('/')}>
            <Typography
                variant="h6"
                noWrap
                href="/"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                Home
            </Typography>
        </Link>
        <Link
            color = 'inherit'
            style={{cursor:"pointer"}}
            onClick={() => history.push('/reviews')}>
          <Typography
            variant="h6"
            noWrap
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          Review
          </Typography>
        </Link>

        <Link
        color = 'inherit'
        style={{cursor:"pointer"}}
        onClick={() => history.push('/mypage')}>
            <Typography
                variant="h6"
                noWrap
                href="/"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
            MyPage
            </Typography>
        </Link>
        <Link
        color = 'inherit'
        style={{cursor:"pointer"}}
        onClick={() => history.push('/search')}>
            <Typography
                variant="h6"
                noWrap
                href="/"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
            Search
            </Typography>
        </Link>
    </AppBar>
    </div>
    )
    
} 