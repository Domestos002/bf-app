<template>
    <div class="list" v-if="list">
        <div class="list__inner">
            <table class="table">
                <thead>
                    <tr>
                        <td>Название огранизации</td>
                        <td>Срок принятия решения, до</td>
                        <td>Статус</td>
                        <td>ФИО координатора</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr :key="item.id" v-for="item in list">
                        <td>{{ item.organization_name }}</td>
                        <td>{{ item.expired_at }}</td>
                        <td>{{ item.status.label }}</td>
                        <td>{{ item.coordinator.full_name }}</td>
                        <td>
                            <router-link
                                class="table__btn"
                                :to="{ name: 'Detail', params: { id: item.id } }" :id="item.id">
                                <SvgIcon name="edit" class="table__icon"/>
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Pagination
                class="list__pagination"
                @changePage="changePage"
                :currentPage="meta.current_page"
                :lastPage="meta.last_page"/>
    </div>
</template>

<script src="./List.js"></script>
<style src="./List.sass" lang="sass"></style>
