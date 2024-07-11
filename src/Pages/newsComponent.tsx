import axios from 'axios';
import React from "react";
import { useState } from 'react';
import {Button, Input, Select} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

const NewsComponent = () => {
    interface ArticleNewsAPI {
        author: string;
        title: string;
        description: string;
        urlToImage: string;
        publishedAt: string;
        content: string;
        category: string;
    }
    // interface ArticleGuardian {
    //     webTitle: string;
    //     webUrl: string;
    //     webPublicationDate: string;
    //     fields: {
    //         thumbnail: string;
    //         bodyText: string;
    //     }
    // }

    const [filterData ,setFilterData] = useState<{
        keywords: string;
        sources: string[];
        category: string;
    }>({
        keywords: '',
        sources: [],
        category: ''
    });

    const [articlesNewsApi, setArticlesNewsApi] = useState<ArticleNewsAPI[]>([]);

    const categories:string[] = [
        "business",
        "entertainment",
        "general",
        "health",
        "science",
        "sports",
        "technology"
    ];

    const apiNames:string[] = [
        "newsapi",
        "guardian"
    ];

    const fetchArticles = async () => {
            try {
                const {keywords, category} = filterData;
                const response = await axios.get('http://localhost:5000/api/auth/newsApi', {
                    params: {keywords, category},
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setArticlesNewsApi(response.data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }

    };

    const navigation = useNavigate();

    const handleSourceChange = (e:any) => {
        const value = e.target.value;
        setFilterData(prev => {
            return {
                ...prev,
                sources: value
            }
        });
    };
const userInfo = JSON.parse(localStorage.getItem('USER_INFO')!);
    return (
        <div>
            {userInfo && userInfo.username! && <h1>Welcome {userInfo.username!}</h1>}
            <Button onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('USER_INFO');
                navigation('/');
            }}>Logout</Button>
            <Input
                type="text"
                value={filterData.keywords}
                onChange={(e) => setFilterData(prev => {
                    return {
                        ...prev,
                        keywords: e.target.value
                    }
                })}
                placeholder="Search for news..."
            />

            <Select multiple onChange={handleSourceChange}>
                {apiNames.map((source, index) => (
                    <option key={index} value={source}>{source}</option>
                ))}
            </Select>

            <Select placeholder={"Select category"} onChange={(e) => setFilterData(prev => {
                return {
                    ...prev,
                    category: e.target.value
                }
            })}>

                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </Select>


            <Button onClick={fetchArticles}>Search</Button>
            <div>


                {articlesNewsApi.map((article, index) => (
                    <div key={index}>
                        {article.urlToImage && <img src={article.urlToImage} alt={article.title}/>}
                        <h3>{article.title}</h3>
                        <p>{article.description}</p>
                        <p>{article.author}</p>

                    </div>
                ))}

            </div>
        </div>
    );


}
export default NewsComponent;