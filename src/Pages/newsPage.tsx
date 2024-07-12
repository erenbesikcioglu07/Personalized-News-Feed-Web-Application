import axios from 'axios';
import React, {useEffect} from "react";
import { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardBody, Grid,
    Heading,
    Image,
    Input,
    Select,
    Stack,
    Text, Wrap
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import ModalComponent from "../Components/Modal";

const NewsPage = () => {

    interface ArticleNewsAPI {
        author: string;
        title: string;
        description: string;
        urlToImage: string;
        publishedAt: string;
        content: string;
        category: string;
    }

    const [filterData ,setFilterData] = useState<{
        keywords: string;
        sources: string[];
        category: string;
    }>({
        keywords: '',
        sources: [],
        category: ''
    });

    const navigation = useNavigate();

    const [articlesNewsApi, setArticlesNewsApi] = useState<ArticleNewsAPI[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        "newsapi"
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
    useEffect(() => {
        fetchArticles();
        setIsModalOpen(true);
    }, []);


    const handleSourceChange = (e:any) => {
        const value = e.target.value;
        setFilterData(prev => {
            return {
                ...prev,
                sources: value
            }
        });
    };


    return (
        <div>
            <Grid
                h='100px'
                bg='grey'
                templateColumns='repeat(2,1fr)'
                gap={1200}
            >
                <Box>
                    <ModalComponent isOpen={isModalOpen} />
                        <Text
                            fontSize='30px'
                            as='b'
                        >
                            News Feed Application
                        </Text>
                </Box>
                <Box>
                    <Button
                        color='black'
                        onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('USER_INFO');
                        navigation('/');
                    }}>Logout</Button>
                </Box>
            </Grid>

            <Box
                w='100%'
                p='5'
            >
                <Wrap>
                    <Input
                        h='50px'
                        type="text"
                        value={filterData.keywords}
                        onChange={(e) => setFilterData(prev => {
                            return {
                                ...prev,
                                keywords: e.target.value
                            }
                        })}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                fetchArticles();
                            }
                        }}
                        placeholder="Search for news..."
                    />

                    <Select
                        placeholder={"Select source"}
                        onChange={handleSourceChange}
                        w='200px'
                    >
                        {apiNames.map((source, index) => (
                            <option key={index} value={source}>{source}</option>
                        ))}
                    </Select>

                    <Select
                        w='200px'
                        placeholder={"Select category"}
                        onChange={(e) => setFilterData(prev => {
                        return {
                            ...prev,
                            category: e.target.value
                        }
                    })}>

                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </Select>


                    <Button
                        onClick={fetchArticles}

                    >Search</Button>
                </Wrap>
            </Box>
            <Box
                bg='blue'
                w='100%'>
                <Text color='white' fontSize='3xl' align='center'>News</Text>
            </Box>
            <div className="card-container">
                {articlesNewsApi.map((article, index) => (
                    <Box
                        key={index}
                        maxW='xl'
                        borderWidth='5px'
                        borderRadius='10px'
                    >
                        <Card align='center' key={index} size='md' >
                            <CardBody>
                                {article.urlToImage &&
                                    <Image boxSize='500px'
                                           objectFit='cover'
                                           src={article.urlToImage}
                                           alt={article.title}
                                    />}

                                <Stack mt='6' spacing='3' >
                                    <Heading as='h3' size='md'>
                                        {article.title}
                                    </Heading>
                                    <Text>
                                        {article.description}
                                    </Text>
                                    <Text color={'gray.500'} fontSize='xl'>
                                        {article.author}
                                    </Text>

                                </Stack>
                            </CardBody>
                        </Card>
                    </Box>
                ))}
            </div>
            );



        </div>
    );


}
export default NewsPage;