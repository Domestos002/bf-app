<template>
    <div class="pagination">
        <span
                @click="prevPage"
                v-if="currentPage > 1"
                class="pagination__link pagination__prev">Предыдущая</span>

        <div class="pagination__list" @click="onClick">
            <template v-for="index in lastPage">
                <span v-if="getFirstEllipsis(index)" class="pagination__dummy">
                    ...
                </span>

                <span v-if="getPage(index)"
                      :class="{ 'pagination__link--active': currentPage === index }"
                      class="pagination__link " :data-num="index">{{ index }}</span>

                <span v-if="getLastEllipsis(index)" class="pagination__dummy">
                    ...
                </span>
            </template>
        </div>

        <span @click="nextPage"
              v-if="lastPage > currentPage"
              class="pagination__link pagination__next">Следующая</span>
    </div>
</template>

<script src="./Pagination.js"></script>
<style src="./Pagination.sass" lang="sass"></style>
