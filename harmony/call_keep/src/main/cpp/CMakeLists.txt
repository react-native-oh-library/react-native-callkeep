cmake_minimum_required(VERSION 3.13)
set(CMAKE_VERBOSE_MAKEFILE on)

set(rnoh_call_keep_generated_dir "${CMAKE_CURRENT_SOURCE_DIR}/generated")
file(GLOB_RECURSE rnoh_call_keep_generated_SRC "${rnoh_call_keep_generated_dir}/**/*.cpp")
file(GLOB rnoh_call_keep_SRC CONFIGURE_DEPENDS *.cpp)
add_library(rnoh_call_keep SHARED ${rnoh_call_keep_SRC} ${rnoh_call_keep_generated_SRC})
target_include_directories(rnoh_call_keep PUBLIC ${CMAKE_CURRENT_SOURCE_DIR} ${rnoh_call_keep_generated_dir})
target_link_libraries(rnoh_call_keep PUBLIC rnoh)