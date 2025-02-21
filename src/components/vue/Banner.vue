<template>
    <section class = "banner">
        <div class="banner-content">
            <h3> The Technology Ambassadors Program (TAP) aims to increase the number of students who persist in technology fields, particularly those underrepresented in computing. We provide fun and engaging technology activities for K-12 and college classrooms and outreach events. These activities were developed in a college-level service learning course that provides <em>scholarship, leadership, service, and creativity</em> skills. 
            <a href="https://www.ggc.edu/academics/school-of-science-and-technology/research-internships-service-learning/technology-ambassador-program" class="click" target="_blank">Read more...</a></h3>
        </div>
    </section>
</template>

<script>
export default{
    name: "Banner",
}
</script>

<style scoped>
.banner{
    background-color: var(--agnostic-gray-mid);
    color: var(--agnostic-dark);
    text-align: center;
    padding: 2rem 3rem;
    width: 100vw;
}
.banner-content{
    width: 70%;
    font-weight: 300;
    padding: 1rem 0.625rem;
    margin: 0 auto;
}
.banner a {
    display: inline-block;
    color: var(--agnostic-dark) !important;
    text-decoration: underline;
}
.banner a:hover{
    color: var(--agnostic-primary-hover) !important;
    font-weight: 700 !important;
}
.banner h3{
    font-weight: 300 !important;
    font-size: 150%; /* 1rem */
}

</style>