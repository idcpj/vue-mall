<template>
    <div>
        <nav-bread>
            <span>goods</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">Sort by:</span>
                    <a href="javascript:void(0)" class="default cur">Default</a>
                    <a href="javascript:void(0)" class="price" @click="sortGoods">Price
                        <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg>
                    </a>
                    <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div class="filter stopPop" id="filter">
                        <dl class="filter-price">
                            <dt>Price:</dt>
                            <dd @click="setPriceFilter('all')">
                                <a href="javascript:void(0)" :class="{'current-price':currentPrice=='all'}">All</a>
                            </dd>
                            <dd v-for="(price,index) in priceFilter" @click="setPriceFilter(index)" >
                                <a href="javascript:void(0)"   :class="{'current-price':currentPrice==index}">{{price.startPrice}} - {{price.endPrice}}</a>
                            </dd>
                        </dl>
                    </div>

                    <!-- search result accessories list -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li v-for="(goods,index) in goodsList" :key="index">
                                    <div class="pic">
                                        <a href="#"><img v-lazy="'static/'+goods.productImage" alt=""></a>
                                    </div>
                                    <div class="main">
                                        <div class="name"> {{goods.productName}}</div>
                                        <div class="price">{{goods.prodcutPrice}}</div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="btn btn--m" @click="addCart(goods.productId)">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <infinite-loading @infinite="loadMore" spinner="waveDots"></infinite-loading>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import "@/assets/css/product.css";

import NavBread from "@/components/NavBread";
import axios from "axios";
import InfiniteLoading from 'vue-infinite-loading';


const config = require('../../config');

export default {
    data(){
        return {
            goodsList:[],
            priceFilter:[
                {
                    startPrice:'0.00',
                    endPrice:'100.00'
                },
                {
                    startPrice:'100.00',
                    endPrice:'500.00'
                },
                {
                    startPrice:'500.00',
                    endPrice:'1000.00'
                },
                {
                    startPrice:'1000.00',
                    endPrice:'2000.00'
                },
            ],
            currentPrice:"all",
            sortFlag:true,
            page:1,
            pageSize:2,
            busy:false
        }
    },
    mounted(){
        this.getGoodsList();
    },
    methods:{
        getGoodsList($state){
            var params={
                page:this.page,
                pageSize:this.pageSize,
                sort:this.sort?1:-1,
                priceLevel:this.currentPrice,
            }
            axios.get(config.api.goods,{
                params:params
            }).then(res=>{
                if (res.data.status===0){
                    if($state){
                        this.goodsList = this.goodsList.concat(res.data.result.list);
                        if(res.data.result.count<this.pageSize){
                            $state.complete()
                        }else {
                            $state.loaded();

                        }

                    }else{
                        this.goodsList = res.data.result.list
                    }
                }else{
                    this.goodsList=[];
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        sortGoods(){
            this.sortFlag=!this.sortFlag
            this.page=1
            this.goodsList()
        },
        loadMore($state){
            this.busy = true; //使滚动加载失效
            //使用 setTImeout 防止 连续发送请求
            setTimeout(() => {
                this.page++;
                this.getGoodsList($state);
            }, 1000);
        },
        setPriceFilter(index){
           this.goodsList=[];
           this.currentPrice=index;
           this.page=1;
           this.getGoodsList();

        },
        addCart(goodId){
            axios.get(config.api.addCart,{
                params:{productId:goodId}
//            axios.post(config.api.addCart,{
//                productId:goodId
            }).then((res)=>{
                if (res.data.status===0){
                    alert("加入成功");

                }else{
                    alert(res.data.msg);
                }

            })
        }

    },
    components: {
        NavBread,InfiniteLoading
    }
}
</script>

<style scoped >
.current-price{
    color:#ee7a23;
}
</style>